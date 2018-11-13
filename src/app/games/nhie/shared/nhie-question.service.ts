import { Injectable } from '@angular/core';
import { FirestoreService } from '../../../core/firebase/firestore/firestore.service';
import { NhieQuestion } from './nhie';
import { FeedbackService } from '../../../core/feedback/feedback.service';
import { FeedbackMessage, FeedbackType } from '../../../core/feedback/feedback.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { take } from 'rxjs/internal/operators';

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

  getQuestions(startAt: number): Observable<string[]> {
    return this.firestoreService.list(this.path).pipe(
      map(questions => questions.map(question => question.question)),
      take(1),
    );
  }
}
