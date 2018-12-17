import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {PartyService} from '../../party/shared/party.service';
import {FeedbackService} from '../../core/feedback/feedback.service';
import {FeedbackMessage, FeedbackType} from '../../core/feedback/feedback.model';
import {Party} from '../../party/shared/party';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss']
})
export class MenuButtonComponent implements OnInit {

  constructor(
    private partyService: PartyService,
    private router: Router,
    private feedbackService: FeedbackService) { }

  @Output()
  leaveClick = new EventEmitter();

  @Output()
  gameInfoClick = new EventEmitter();

  party: Party;

  partySub: Subscription;

  // @ViewChild('shareButton') shareButton;


  ngOnInit() {
    this.partySub = this.partyService.party.subscribe(party => {
      this.party = party;
    });
  }

  leaveGameClick() {
    this.partyService.leaveParty().then( () => {
      this.router.navigate(['/']);
    });
  }
}
