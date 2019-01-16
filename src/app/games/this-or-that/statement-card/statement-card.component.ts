import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-statement-card',
  templateUrl: './statement-card.component.html',
  styleUrls: ['./statement-card.component.scss']
})
export class StatementCardComponent implements OnInit {

  @Input() option: string;
  @Input() backgroundColor: string;
  @Input() choice: boolean;

  turned = false;

  constructor() { }

  ngOnInit() {
  }

  turn() {
    this.turned = !this.turned;
  }

}
