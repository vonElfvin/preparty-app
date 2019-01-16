import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-statement-card',
  templateUrl: './statement-card.component.html',
  styleUrls: ['./statement-card.component.scss']
})
export class StatementCardComponent implements OnInit {

  @Input() text: string;
  @Input() backgroundColor: string;

  constructor() { }

  ngOnInit() {
  }

}
