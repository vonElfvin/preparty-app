import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PartyService} from '../shared/party.service';

@Component({
  selector: 'app-alias',
  templateUrl: './alias.component.html',
  styleUrls: ['./alias.component.scss']
})
export class AliasComponent implements OnInit {

  alias: string;
  gameName: string;
  joinCode: string;
  admin = true;

  constructor(private router: Router, private route: ActivatedRoute, private partyService: PartyService) { }

  ngOnInit() {
    this.joinCode = this.route.snapshot.params['joinCode'];
    this.partyService.getPartyByJoinCode(this.joinCode).subscribe(party => {
    })

  }

  setAlias() {
    // User.name = this.alias
    console.log(this.alias);
    // this.router.navigateByUrl('/' + this.gameName + '/' + this.joinCode);
  }
}
