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
export class AddQuestionsComponent implements OnInit {

  questions = null;

  constructor(
    private nhieQuestionService: NhieQuestionService,
    private feedbackService: FeedbackService,
  ) { }

  ngOnInit() {
  }

  addQuestion() {
    const questions = this.questions.split('\n');
    const n_questions = questions.length;
    if (!n_questions) {
      this.feedbackService.message(FeedbackMessage.QuestionError, FeedbackType.Error);
      return;
    }
    for (let i = 0; i < n_questions; ++i) {
      const question_level = questions[i].split('\t');
      const question = question_level[0];
      const level = question_level[1];
      const nhieQuestion: NhieQuestion = {
        question: question,
        level: +level
      };
      this.nhieQuestionService.addQuestion(nhieQuestion);
    }
  }
}
