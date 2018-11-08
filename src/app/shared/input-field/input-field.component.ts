import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss']
})
export class InputFieldComponent implements OnInit {

  @Output() voted = new EventEmitter<boolean>();
  joinCode: string;

  constructor() { }

  ngOnInit() {
  }

}
