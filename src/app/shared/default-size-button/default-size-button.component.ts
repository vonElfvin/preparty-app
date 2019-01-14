import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-default-size-button',
  templateUrl: './default-size-button.component.html',
  styleUrls: ['./default-size-button.component.scss']
})
export class DefaultSizeButtonComponent implements OnInit {

  @Input() text: string;
  @Input() matIconName?: string;
  @Input() disabled: boolean;

  constructor() { }

  ngOnInit() {
  }

}
