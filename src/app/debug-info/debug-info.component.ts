import { Component, OnInit } from '@angular/core';
import { Party } from 'src/app/party/shared/party';
import { PartyService } from 'src/app/party/shared/party.service';


@Component({
  selector: 'app-debug-info',
  templateUrl: './debug-info.component.html',
  styleUrls: ['./debug-info.component.scss']
})
export class DebugInfoComponent implements OnInit {

  party: Party;
  joinCode: string;
  gameLeader: boolean;

  constructor(private partyService: PartyService) { }

  ngOnInit() {

    this.partyService.party.subscribe((party: Party) => {
      this.party = party;
    });
    this.partyService.isGameLeaderObservable.subscribe((gameleader: boolean) => {
      this.gameLeader = gameleader;
    })
  }
}
