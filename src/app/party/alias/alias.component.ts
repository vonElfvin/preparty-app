import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PartyService } from '../shared/party.service';
import {Observable, Subscription} from 'rxjs';
import { Game } from '../../games/shared/game.model';
import { GameService } from '../../games/shared/game.service';
import { AuthService } from '../../core/auth/auth.service';
import { Party } from '../shared/party';

@Component({
  selector: 'app-alias',
  templateUrl: './alias.component.html',
  styleUrls: ['./alias.component.scss']
})
export class AliasComponent implements OnInit, OnDestroy {

  alias: string;
  joinCode: string;
  gameObservable: Observable<Game>;
  party: Party;
  gameCodeText: string;
  startButtonText = 'Join Game';
  isLeader = false;
  subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private partyService: PartyService,
    private gameService: GameService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.joinCode = this.route.snapshot.params['joinCode'];
    this.subscription = this.partyService.getPartyByJoinCode(this.joinCode).subscribe(party => {
      this.party = party;
      this.setGameCodeText();
      this.gameObservable = this.gameService.getGame(this.party.selectedGame);
    });
  }

  setAlias() {
    this.authService.loginAnonymously().then(() => {
      // this.authService.upsertUserAlias(this.alias);
      this.authService.joinParty(this.alias, this.party.id);
      this.router.navigate([`lobby/${this.joinCode}`]);
    });
  }

  setGameCodeText() {
    if (this.partyService.isGameLeader) {
      this.isLeader = true;
      this.gameCodeText = 'Create game to generate game code!';
      this.startButtonText = 'Create Game';
    } else {
      this.isLeader = false;
      this.gameCodeText = this.party.joinCode;
      this.startButtonText = 'Join Game';
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
