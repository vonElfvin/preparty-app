import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
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
export class MenuButtonComponent implements OnInit, OnDestroy {

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

  inviteFriends() {
    // window.open('fb-messenger://share?link=' + encodeURIComponent('google.com') + '&app_id=' + encodeURIComponent('1406488912743309'));
    // IF on an Androd device use the built in share API
    if (navigator['share']) {
      navigator['share']({
        title: 'Perparty. ',
        text: 'Check out this great article about the Web Share API',
        url: 'https://mobiforge.com/design-development/web-share-api'
      })
        .then(() => console.log('Share complete'))
        .error((error) => console.error('Could not share at this time', error));
    } else {
      // If not on Android share by copying link
      const url = 'https://preparty.app/alias/' + this.party.joinCode;
      this.copyMessage(url);
      this.feedbackService.message(FeedbackMessage.Custom, FeedbackType.Primary, 'Copied invite URL!');
    }
  }

  copyMessage(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox['value'] = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  ngOnDestroy(): void {
    this.partySub.unsubscribe();
  }
}
