import {Component, ElementRef, Input, ViewChild} from '@angular/core';

@Component({
  selector: 'app-nhie-card',
  templateUrl: './nhie-card.component.html',
  styleUrls: ['./nhie-card.component.scss']
})
export class NhieCardComponent {

  private _question: string;

  @Input()
  set question(question: string) {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 400);

    this._question = question;
  }

  isLoading: boolean;

  constructor() {}

}
