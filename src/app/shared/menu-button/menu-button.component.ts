import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {PartyService} from '../../party/shared/party.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss']
})
export class MenuButtonComponent implements OnInit, OnDestroy {

  selectedGame: string;
  partySub: Subscription;

  constructor(
    private partyService: PartyService,
    private router: Router) { }

  @Output()
  leaveClick = new EventEmitter();

  @Output()
  gameInfoClick = new EventEmitter();

  ngOnInit() {
    this.partySub = this.partyService.party.subscribe( party => {
      if (party) {
        this.selectedGame = party.selectedGame;
      } else {
        this.selectedGame = null;
      }
    });
  }

  leaveGameClick() {
    this.partyService.leaveParty().then( () => {
      this.router.navigate(['/']);
    });
  }

  infoClick() {
    this.router.navigate(['game-info/' + this.selectedGame]);
  }

  ngOnDestroy(): void {
    this.partySub.unsubscribe();
  }
}
