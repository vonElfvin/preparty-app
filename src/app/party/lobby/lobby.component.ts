import {Component, OnDestroy, OnInit} from '@angular/core';
import { Party } from '../shared/party';
import { PartyService } from '../shared/party.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GameInstanceService } from '../../games/shared/game-instance.service';
import { NhieGameInstanceService } from '../../games/nhie/shared/nhie-game-instance.service';
import {combineLatest, Observable, Subscription} from 'rxjs';
import {GameService} from '../../games/shared/game.service';
import {Game} from '../../games/shared/game.model';
import {AuthService} from '../../core/auth/auth.service';
import { tap, take } from 'rxjs/operators';
import {MenuService} from '../shared/menu.service';


@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit, OnDestroy {

  waitingMessage = 'Waiting for Game Leader <br> to start the game...';
  party: Observable<Party>;
  isLoggedIn: Observable<boolean>;
  isGameLeader: Observable<boolean>;

  gameInstanceSub: Subscription;


  constructor(
    private partyService: PartyService,
    private router: Router,
    private gameInstanceService: GameInstanceService,
    private route: ActivatedRoute,
    private gameService: GameService,
    private authService: AuthService,
    private menuServie: MenuService
  ) { }

  ngOnInit() {
    this.menuServie.setMenuVisibility(true);
    this.party = this.partyService.party;
    this.isGameLeader = this.partyService.isGameLeaderObservable;
    this.isLoggedIn = this.authService.isLoggedInObservable;
    this.checkGameInstance();
  }

  checkGameInstance() {
    this.gameInstanceSub = this.gameInstanceService.gameInstance.subscribe(gameInstance => {
      if (gameInstance && this.router.url.indexOf('lobby') !== -1) {
        this.router.navigate(['game/' + gameInstance.gameId + '/' + gameInstance.joinCode]);
      }
    });
  }

  startGame() {
    this.party.pipe(
      take(1)
    ).subscribe(party => {
      this.router.navigate(['game/' + party.selectedGame + '/' + party.joinCode]);
    });
  }

  ngOnDestroy(): void {
    if (this.gameInstanceSub) {
      this.gameInstanceSub.unsubscribe();
    }

  }
}
