import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NhieGameInstanceService} from '../shared/nhie-game-instance.service';

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

  constructor(
    private nhieService: NhieGameInstanceService
  ) { }

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
