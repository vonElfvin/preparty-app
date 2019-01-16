import {Component, Input, OnInit} from '@angular/core';
import {Observable, timer} from 'rxjs';
import {map, take} from 'rxjs/operators';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {

  counter$: Observable<number>;
  @Input()
  count = 20;
  countCss: string;

  constructor() {
    this.countCss = `countdown ${this.count}s linear forwards`;
    this.counter$ = timer(0, 1000).pipe(
      take(this.count),
      map(() => --this.count)
    );
  }

  ngOnInit() {
  }

}
