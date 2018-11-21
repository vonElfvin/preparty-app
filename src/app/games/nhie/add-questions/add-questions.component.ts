import { Component, OnInit } from '@angular/core';
import { NhieQuestionService } from '../shared/nhie-question.service';
import { NhieQuestion } from '../shared/nhie';
import { FeedbackService } from '../../../core/feedback/feedback.service';
import { FeedbackMessage, FeedbackType } from '../../../core/feedback/feedback.model';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.scss']
})
export class AddQuestionsComponent {

  questions = null;

  constructor(
    private nhieQuestionService: NhieQuestionService,
    private feedbackService: FeedbackService,
  ) { }

  addQuestion() {
    const questions = this.questions.split('\n');
    const n_questions = questions.length;
    if (!n_questions) {
      this.feedbackService.message(FeedbackMessage.QuestionError, FeedbackType.Error);
      return;
    }
    for (let i = 0; i < n_questions; ++i) {
      const index_question_level = questions[i].split('\t');
      const index = index_question_level[0];
      const question = index_question_level[1];
      const level = index_question_level[2];
      const nhieQuestion: NhieQuestion = {
        question: question,
        level: +level,
        index: +index,
      };
      this.nhieQuestionService.addQuestion(nhieQuestion);
    }
  }
}
