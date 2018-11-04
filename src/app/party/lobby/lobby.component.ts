import { Component, OnInit } from '@angular/core';
import { Party } from '../shared/party';
import { PartyService } from '../shared/party.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GameInstanceService } from '../../games/shared/game-instance.service';
import { NhieGameInstanceService } from '../../games/nhie/shared/nhieGameInstance.service';
import { Observable } from 'rxjs';
import {GameService} from '../../games/shared/game.service';
import {Game} from '../../games/shared/game.model';


@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

  party: Party;
  aliases: Observable<string[]>;
  game: Game;

  isLeader = false;

  joinCode: string;

  constructor(private partyService: PartyService, private router: Router,
    private gameInstanceService: GameInstanceService, private nhieService: NhieGameInstanceService,
    private route: ActivatedRoute, private gameService: GameService) { }

  ngOnInit() {
    this.joinCode = this.route.snapshot.params['joinCode'];
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

  // Check if game is already created
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
