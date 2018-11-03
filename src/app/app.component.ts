import { Component } from '@angular/core';
import { FeedbackService } from './core/feedback/feedback.service';
import { FeedbackMessage, FeedbackType } from './core/feedback/feedback.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private feedbackService: FeedbackService,
  ) { }

  feedback() {

    this.feedbackService.message(FeedbackMessage.DefaultError, FeedbackType.Primary);
  }
}
