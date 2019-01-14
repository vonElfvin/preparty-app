import {Component, OnInit} from '@angular/core';
import { Party } from '../shared/party';
import { PartyService } from '../shared/party.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GameInstanceService } from '../../games/shared/game-instance.service';
import { Observable} from 'rxjs';
import {GameService} from '../../games/shared/game.service';
import {Game} from '../../games/shared/game.model';
import {AuthService} from '../../core/auth/auth.service';
import {MenuService} from '../shared/menu.service';


@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

  waitingMessage = 'Waiting for Game Leader <br> to start the game...';
  party: Observable<Party>;
  isLoggedIn: Observable<boolean>;
  isGameLeader: Observable<boolean>;
  gameObservable: Observable<Game>;

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
    this.gameObservable = this.gameService.game;
    this.checkGameInstance();
  }

  checkGameInstance() {
    this.gameInstanceService.gameInstance.subscribe(gameInstance => {
      if (gameInstance && this.router.url.indexOf('lobby') !== -1) {
        this.router.navigate(['game/' + gameInstance.gameId]);
      }
    });
  }

  startGame(game) {
    this.router.navigate(['game/' + game.id]);
  }
}
