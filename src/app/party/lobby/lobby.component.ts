import { Component, OnInit } from '@angular/core';
import {Party} from '../shared/party';
import {PartyService} from '../shared/party.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {


  party: Party;

  constructor(private partyService: PartyService) { }

  ngOnInit() {
  }


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

  loadParty() {
    this.partyService.getPartyById('ZeFYWiCD0l6WPvmqSpuV').subscribe(res => {
      this.party = res;
    });
  }

}
