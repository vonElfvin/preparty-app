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


  @Output() answer = new EventEmitter<boolean>();


  constructor() { }

  ngOnInit() {
  }

  answeredQuestion(iHave: boolean) {
    this.answer.emit(iHave);
  }
}
