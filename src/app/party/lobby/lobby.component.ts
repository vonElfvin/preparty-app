import { Component, OnInit } from '@angular/core';
import { Party } from '../shared/party';
import { PartyService } from '../shared/party.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GameInstanceService } from '../../games/shared/game-instance.service';
import { NhieGameInstanceService } from '../../games/nhie/shared/nhie-game-instance.service';
import { combineLatest, Observable } from 'rxjs';
import {GameService} from '../../games/shared/game.service';
import {Game} from '../../games/shared/game.model';
import {AuthService} from '../../core/auth/auth.service';
import { tap, take } from 'rxjs/operators';


@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

  party: Observable<Party>;
  gameObservable: Observable<Game>;
  waitingMessage = 'Waiting for Game Leader <br> to start the game...';
  isLoggedIn: Observable<boolean>;

  isGameLeader: Observable<boolean>;

  joinCode: string;

  constructor(
    private partyService: PartyService,
    private router: Router,
    private gameInstanceService: GameInstanceService,
    private nhieService: NhieGameInstanceService,
    private route: ActivatedRoute,
    private gameService: GameService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.party = this.partyService.party;
    this.isGameLeader = this.partyService.isGameLeaderObservable;
    this.isLoggedIn = this.authService.isLoggedInObservable;
    this.joinCode = this.route.snapshot.params['joinCode'];
    this.joinCode = this.joinCode.toLowerCase();
    this.gameObservable = this.gameService.game;
    this.checkGameInstance();
  }

  checkGameInstance() {
    this.gameInstanceService.gameInstance.subscribe(gameInstance => {
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
}
