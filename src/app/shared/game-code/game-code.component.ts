import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-game-code',
  templateUrl: './game-code.component.html',
  styleUrls: ['./game-code.component.scss']
})
export class GameCodeComponent {

  constructor() { }

  @Input() joinCode: string;
}
