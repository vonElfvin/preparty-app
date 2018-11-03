import { Injectable } from '@angular/core';
import { FirestoreService } from '../../../core/firebase/firestore/firestore.service';
import { NhieQuestion } from './nhie';
import { FeedbackService } from '../../../core/feedback/feedback.service';
import { FeedbackMessage, FeedbackType } from '../../../core/feedback/feedback.model';

@Injectable({
  providedIn: 'root'
})
export class NhieQuestionService {

  private readonly path = 'nhie_question';

  constructor(
    private firestoreService: FirestoreService<NhieQuestion>,
    private feedbackService: FeedbackService,
  ) { }

  addQuestion(nhieQuestion: NhieQuestion) {
    this.firestoreService.insert(this.path, nhieQuestion).then(() => {
      this.feedbackService.message(FeedbackMessage.QuestionSuccess, FeedbackType.Primary);
    }).catch(err => {
      this.feedbackService.message(FeedbackMessage.QuestionError, FeedbackType.Error);
    });
  }
}
