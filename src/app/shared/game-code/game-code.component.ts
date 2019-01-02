import {Component, Input, OnInit} from '@angular/core';
import {PartyService} from '../../party/shared/party.service';
import {Observable} from 'rxjs';
import {Party} from '../../party/shared/party';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-game-code',
  templateUrl: './game-code.component.html',
  styleUrls: ['./game-code.component.scss']
})
export class GameCodeComponent implements OnInit {

  joinCodeObs: Observable<string>;

  constructor(private partyService: PartyService) { }

  @Input() showJoinCode = true;

  ngOnInit(): void {
    this.joinCodeObs = this.partyService.party.pipe(map(party => {
        if (party) {
          return party.joinCode;
        }
      }
    ));
  }

}
