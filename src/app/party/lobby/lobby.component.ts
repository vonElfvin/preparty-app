import { Component, OnInit } from '@angular/core';
import {Party} from '../shared/party';
import {PartyService} from '../shared/party.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GameInstanceService} from '../../games/shared/game-instance.service';
import {NhieGameInstanceService} from '../../games/nhie/shared/nhieGameInstance.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {


  party: Party;

  joinCode: string;

  constructor(private partyService: PartyService, private router: Router,
              private gameInstanceService: GameInstanceService, private nhieService: NhieGameInstanceService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.joinCode = this.route.snapshot.params['id'];
    if (this.joinCode) {
      this.partyService.getPartyByJoinCode(this.joinCode).subscribe(res => {
        this.party = res;
      });
      this.checkGameInstance();
    }
  }

  // Mockup fnctions
  createParty() {
    const users = ['Bengt', 'Agneta', 'Lisa', 'Jan'];
    const  part = <Party>{
      users: users,
      admin: 'Jan',
      selectedGame: 'nhie',
      joinCode: Math.random().toString(36).substring(7)
    };
    this.partyService.createParty(part).then(res => {
      this.party = part;
      this.party.id = res.id;
    });
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
    if (this.party.selectedGame === 'nhie') {
      console.log(this.party);
      this.nhieService.generateNewGameInstance(this.party).then(() => {
        console.log('hej');
        this.checkGameInstance();
      });
    } else {
      this.nhieService.generateNewGameInstance(this.party);
    }
  }
}
