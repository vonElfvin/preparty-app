import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-nhie-card',
  templateUrl: './nhie-card.component.html',
  styleUrls: ['./nhie-card.component.scss']
})
export class NhieCardComponent {

  @Input()
  question: string;

  @Input()
  playerName: string;

  @Input()
  gameInstanceId: string;


  showForm = false;

  @Output() answer = new EventEmitter<boolean>();

  constructor() {}

}
