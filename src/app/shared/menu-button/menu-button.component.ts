import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss']
})
export class MenuButtonComponent implements OnInit {

  constructor() { }

  @Output()
  leaveClick = new EventEmitter();

  @Output()
  gameInfoClick = new EventEmitter();

  ngOnInit() {
  }

}
