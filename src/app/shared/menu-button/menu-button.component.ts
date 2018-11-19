import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {PartyService} from '../../party/shared/party.service';

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss']
})
export class MenuButtonComponent implements OnInit {

  constructor(private partyService: PartyService, private router: Router) { }

  @Output()
  leaveClick = new EventEmitter();

  @Output()
  gameInfoClick = new EventEmitter();

  ngOnInit() {
  }

  leaveGameClick() {
    this.partyService.leaveParty().then( () => {
      this.router.navigate(['/']);
    });
  }

}
