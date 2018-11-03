import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NhieService} from '../shared/nhie.service';

@Component({
  selector: 'app-nhie-card',
  templateUrl: './nhie-card.component.html',
  styleUrls: ['./nhie-card.component.scss']
})
export class NhieCardComponent implements OnInit {

  @Input()
  question: string;

  @Input()
  playerName: string;

  @Input()
  gameInstanceId: string;


  showForm = false;

  newQuestion: string;

  @Output() answer = new EventEmitter<boolean>();

  constructor(private nhieService: NhieService) { }

  ngOnInit() {
  }

  answeredQuestion(iHave: boolean) {
    this.answer.emit(iHave);
  }

  addQuestionToGame(question: string) {
    this.showForm = !this.showForm;
    this.nhieService.addQuestionToGameInstance(this.gameInstanceId, question);

  }


}
