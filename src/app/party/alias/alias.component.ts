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
  isGameLeader: boolean;
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
    this.gameObservable = this.gameService.game;
    this.subscription = this.partyService.isGameLeaderObservable.subscribe(isGameLeader => {
      this.isGameLeader = isGameLeader;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  setAlias() {
    this.authService.upsertUserAlias(this.alias).then(() => {
      this.router.navigate([`lobby/${this.joinCode}`]);
    });
  }
}
