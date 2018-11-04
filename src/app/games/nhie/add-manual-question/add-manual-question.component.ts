import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-add-manual-question',
  templateUrl: './add-manual-question.component.html',
  styleUrls: ['./add-manual-question.component.scss']
})
export class AddManualQuestionComponent implements OnInit {

  newManualQuestion: string;

  @Output() navigateBack = new EventEmitter();
  @Output() submitNewQuestion = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  submitNewManualQuestionClick() {
    this.submitNewQuestion.emit(this.newManualQuestion);
  }

  navigateBackClick() {
    this.navigateBack.emit(true);
  }

}
