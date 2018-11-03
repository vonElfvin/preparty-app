import { Component, OnInit } from '@angular/core';
import {Party} from '../shared/party';
import {PartyService} from '../shared/party.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GameInstanceService} from '../../games/shared/game-instance.service';
import {NhieService} from '../../games/nhie/shared/nhie.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {


  party: Party;

  constructor(private partyService: PartyService, private router: Router,
              private gameInstanceService: GameInstanceService, private nhieService: NhieService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const joinCode = this.route.snapshot.params['id'];
    if (joinCode) {
      this.partyService.getPartyByJoinCode(joinCode).subscribe(res => {
        this.party = res;
      });
      this.gameInstanceService.getGameInstanceByJoinCode(joinCode).subscribe(gameInstance => {
        if (gameInstance) {
          this.router.navigate([gameInstance.gameId + '/' + gameInstance.joinCode]);
        }
      });
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
      console.log(this.party);
    });
  }

  startGame() {
    if (this.party.selectedGame === 'nhie') {
      this.nhieService.generateNewGameInstance(this.party).then(() => {
        console.log('hej');
      });
    } else {
      this.nhieService.generateNewGameInstance(this.party);
    }
  }
}
