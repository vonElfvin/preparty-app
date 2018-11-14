import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-game-code',
  templateUrl: './game-code.component.html',
  styleUrls: ['./game-code.component.scss']
})
export class GameCodeComponent implements OnInit {

  constructor() { }

  @Input()
  gameCode: string;

  @Input()
  notGameCode: string;

  header = 'GameCode';

  ngOnInit() {
    if (this.notGameCode) {
      this.header = this.gameCode;
    }
  }

}
