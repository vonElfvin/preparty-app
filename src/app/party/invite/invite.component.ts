import { Component, OnInit, OnDestroy } from '@angular/core';
import { FeedbackService } from '../../core/feedback/feedback.service';
import { FeedbackMessage, FeedbackType } from '../../core/feedback/feedback.model';
import { Subscription } from 'rxjs';
import { Party } from '../../party/shared/party';
import { PartyService } from '../../party/shared/party.service';
import { environment } from '../../../environments/environment.prod';


@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit, OnDestroy {

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
    let iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

    // IF on an Androd device use the built in share API
    if (navigator['share']) {
      navigator['share']({
        title: 'Preparty. ',
        text: 'Join my preparty drinking game:',
        url: 'https://preparty.app/alias/' + this.party.joinCode + '/true'
      })
        .then(() => console.log('Share complete'))
        .error((error) => console.error('Could not share at this time', error));
    } else if (iOS) {
      let app_id = environment.messenger_app_id;
      window.open('fb-messenger://share?link=' + encodeURIComponent('https://preparty.app/alias/' + this.party.joinCode + '/true') + '&app_id=' + encodeURIComponent(app_id));
    }
    else {
      // If not on Android or iOS share by copying link
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

  ngOnDestroy(): void {
    this.partySub.unsubscribe();
  }
}
