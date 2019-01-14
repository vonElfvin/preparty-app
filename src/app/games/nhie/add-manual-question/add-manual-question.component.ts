import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MenuService} from '../../../party/shared/menu.service';

@Component({
  selector: 'app-add-manual-question',
  templateUrl: './add-manual-question.component.html',
  styleUrls: ['./add-manual-question.component.scss']
})
export class AddManualQuestionComponent implements OnInit {

  newManualQuestion: string;

  @Output() submitNewQuestion = new EventEmitter<string>();

  @Output() hideAddQuestion = new EventEmitter<string>();

  constructor(private menuService: MenuService) { }

  ngOnInit() {
  }

  submitNewManualQuestionClick() {
    this.menuService.setHideAll(false);
    this.submitNewQuestion.emit(this.newManualQuestion);
  }

}
