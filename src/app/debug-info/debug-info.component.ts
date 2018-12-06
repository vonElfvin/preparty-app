import { Component, OnInit } from '@angular/core';
import { Party } from 'src/app/party/shared/party';
import { PartyService } from 'src/app/party/shared/party.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-debug-info',
  templateUrl: './debug-info.component.html',
  styleUrls: ['./debug-info.component.scss']
})
export class DebugInfoComponent implements OnInit {

  party: Party;
  joinCode: string;

  constructor(private partyService: PartyService,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
    
    this.joinCode = this.route.snapshot.params['joinCode'];
    this.partyService.party.subscribe((party: Party) => {
      this.party = party;
    });
  }
}
