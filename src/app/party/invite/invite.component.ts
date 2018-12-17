import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../core/feedback/feedback.service';
import { FeedbackMessage, FeedbackType } from '../../core/feedback/feedback.model';
import { Subscription } from 'rxjs';
import { Party } from '../../party/shared/party';
import { PartyService } from '../../party/shared/party.service';



@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit {

  constructor(
    private feedbackService: FeedbackService,
    private partyService: PartyService
  ) { }

  partySub: Subscription;
  party: Party;

  // @ViewChild('shareButton') shareButton;

  ngOnInit() {
    this.partySub = this.partyService.party.subscribe(party => {
      this.party = party;
    });
  }


  inviteFriends() {
    // window.open('fb-messenger://share?link=' + encodeURIComponent('google.com') + '&app_id=' + encodeURIComponent('1406488912743309'));
    // IF on an Androd device use the built in share API
    if (navigator['share']) {
      navigator['share']({
        title: 'Preparty. ',
        text: 'Join my preparty drinking game:',
        url: 'https://preparty.app/alias/' + this.party.joinCode + '/true'
      })
        .then(() => console.log('Share complete'))
        .error((error) => console.error('Could not share at this time', error));
    } else {

      //window.open('fb-messenger://share?link=' + encodeURIComponent('https://preparty.app/alias/' + this.party.joinCode + '/true') + '&app_id=' + encodeURIComponent(app_id));

      // If not on Android share by copying link
      const url = 'https://preparty.app/alias/' + this.party.joinCode + '/true';
      this.copyMessage(url);
      this.feedbackService.message(FeedbackMessage.Custom, FeedbackType.Primary, 'Copied invite link!');
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

}
