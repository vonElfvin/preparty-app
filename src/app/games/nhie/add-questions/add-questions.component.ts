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
  levels = null;

  constructor(
    private nhieQuestionService: NhieQuestionService,
    private feedbackService: FeedbackService,
  ) { }

  ngOnInit() {
  }

  addQuestion() {
    const questions = this.questions.split('\n');
    const levels = this.levels.split('\n');
    const n_questions = questions.length;
    const n_levels = levels.length;
    if (n_levels !== n_questions) {
      this.feedbackService.message(FeedbackMessage.QuestionError, FeedbackType.Error);
      return;
    }
    for (let i = 0; i < n_questions; ++i) {
      const nhieQuestion: NhieQuestion = {
        question: questions[i],
        level: +levels[i]
      };
      this.nhieQuestionService.addQuestion(nhieQuestion);
    }
    console.log(this.questions);
    console.log(this.levels);
    console.log(n_questions);
    console.log(n_levels);
  }
}
