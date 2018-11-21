import { Injectable } from '@angular/core';
import { FirestoreService } from '../../../core/firebase/firestore/firestore.service';
import { NhieQuestion } from './nhie';
import { FeedbackService } from '../../../core/feedback/feedback.service';
import { FeedbackMessage, FeedbackType } from '../../../core/feedback/feedback.model';
import { map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { take } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class NhieQuestionService {

  nQuestions = 198; // Haurcaud

  private readonly path = 'nhie-questions';

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

  getQuestionByIndex(index: number) {
    return this.firestoreService.list(this.path, ref => ref
      .where('index', '==', index)).pipe(
        map(question => question[0])
    );
  }

  getQuestions(seenQuestions: number[]): Observable<NhieQuestion[]> {

    // Get random numbers
    const randomQuestionIndexes: number[] = [];
    let random: number;
    while (randomQuestionIndexes.length < 10) {
      random = Math.floor(Math.random() * this.nQuestions) + 1;
      if (randomQuestionIndexes.indexOf(random) === -1 && seenQuestions.indexOf(random) === -1) {
        randomQuestionIndexes.push(random);
      }
    }

    const questions: Observable<NhieQuestion>[] = [];

    randomQuestionIndexes.forEach(index => {
      questions.push(this.getQuestionByIndex(index));
    });

    return combineLatest(questions).pipe(
      take(1)
    );
  }
}
