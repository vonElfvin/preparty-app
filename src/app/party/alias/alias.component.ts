import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PartyService } from '../shared/party.service';
import {Observable, Subscription} from 'rxjs';
import { Game } from '../../games/shared/game.model';
import { GameService } from '../../games/shared/game.service';
import { AuthService } from '../../core/auth/auth.service';
import { Party } from '../shared/party';
import {FeedbackService} from '../../core/feedback/feedback.service';
import {FeedbackMessage, FeedbackType} from '../../core/feedback/feedback.model';

@Component({
  selector: 'app-alias',
  templateUrl: './alias.component.html',
  styleUrls: ['./alias.component.scss']
})
export class AliasComponent implements OnInit, OnDestroy {

  alias: string;
  joinCode: number;
  gameObservable: Observable<Game>;
  isGameLeader: boolean;
  subscription: Subscription;
  fromLink: string;
  party: Party;
  // TODO: Fix better nicknames
  nicknames = ['Bob', 'Obi Wan', 'Copycat', 'Zelda', 'Big Mac', 'Baby Boo', 'Champ', 'King Kong',
    'Snicky Snack', 'Kraken', 'Oh Snap', 'Katniss'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private partyService: PartyService,
    private gameService: GameService,
    private authService: AuthService,
    private feedbackService: FeedbackService
  ) { }

  ngOnInit() {
    this.joinCode = this.route.snapshot.params['joinCode'];
    this.fromLink = this.route.snapshot.params['fromLink'];
    this.gameObservable = this.gameService.game;
    this.subscription = this.partyService.isGameLeaderObservable.subscribe(isGameLeader => {
      this.isGameLeader = isGameLeader;
    });
    console.log(this.route.snapshot.params);
    if (this.fromLink) {
      this.partyService.party.subscribe(party => {
        console.log(party);
        this.party = party;
        if ((party && party.joinCode === this.joinCode)) {
          return;
        } else {
          this.partyService.joinGame(this.joinCode).then(res => {
            console.log(res);
          }).catch(err => {
            this.router.navigate(['/']);
            this.feedbackService.message(FeedbackMessage.JoinCodeError, FeedbackType.Error);
          });
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  setAlias() {
    if (!this.alias) {
      this.alias = this.nicknames[Math.floor(Math.random() * this.nicknames.length)];
    }
    this.authService.upsertUserAlias(this.alias).then(() => {
      this.router.navigate([`lobby/${this.joinCode}`]);
    });
  }
}
