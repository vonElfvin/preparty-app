import { Component, OnInit } from '@angular/core';
import {PartyService} from '../party/shared/party.service';
import {Observable} from 'rxjs';
import {Party} from '../party/shared/party';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {


  constructor(private partyService: PartyService) { }

  ngOnInit() {
  }

}
