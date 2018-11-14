import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss']
})
export class BackButtonComponent implements OnInit {

  constructor() { }

  @Input()
  routerLink: string;

  @Output()
  click = new EventEmitter();

  ngOnInit() {
  }
}
