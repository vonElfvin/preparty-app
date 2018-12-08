import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-nhie-card',
  templateUrl: './nhie-card.component.html',
  styleUrls: ['./nhie-card.component.scss']
})
export class NhieCardComponent {

  @Input()
  question: string;

  constructor() {}

}
