import { Component, OnInit } from '@angular/core';
import { Party } from '../shared/party';
import { PartyService } from '../shared/party.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GameInstanceService } from '../../games/shared/game-instance.service';
import { NhieGameInstanceService } from '../../games/nhie/shared/nhieGameInstance.service';
import { Observable } from 'rxjs';
import {GameService} from '../../games/shared/game.service';
import {Game} from '../../games/shared/game.model';
import {AuthService} from '../../core/auth/auth.service';


@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

  party: Party;
  aliases: Observable<string[]>;
  game: Game;
  waitingMessage = 'Waiting for Game Leader <br> to start the game...';
  isLoggedIn: Observable<boolean>;

  isLeader = false;

  joinCode: string;

  constructor(private partyService: PartyService, private router: Router,
    private gameInstanceService: GameInstanceService, private nhieService: NhieGameInstanceService,
    private route: ActivatedRoute, private gameService: GameService,
              private authService: AuthService) { }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedInObservable;
    this.joinCode = this.route.snapshot.params['joinCode'];
    console.log(this.joinCode);
    if (this.joinCode) {
      this.partyService.getPartyByJoinCode(this.joinCode).subscribe(party => {
        this.party = party;
        this.isLeader = this.partyService.isGameLeader(party);
        this.aliases = this.getAliases();
        this.gameService.getGame(party.selectedGame).subscribe(game => {
          this.game = game;
        });
      });
      this.checkGameInstance();
    }
  }

  checkGameInstance() {
    if (!this.joinCode) {
      this.joinCode = this.party.joinCode;
    }
    if (this.joinCode) {
      this.gameInstanceService.getGameInstanceByJoinCode(this.joinCode).subscribe(gameInstance => {
        if (gameInstance) {
          this.router.navigate([gameInstance.gameId + '/' + gameInstance.joinCode]);
        }
      });
    }
  }

  startGame() {
    this.router.navigate([this.game.urlPath + '/' + this.party.joinCode]);
  }

  getAliases() {
    return this.partyService.getAliasesOfParty(this.party);
  }
}
