import { Component, OnInit } from '@angular/core';
import {Observable, timer} from 'rxjs';
import {map, take} from 'rxjs/operators';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {

  counter$: Observable<number>;
  count = 10;

  constructor() {
    this.counter$ = timer(0, 1000).pipe(
      take(this.count),
      map(() => --this.count)
    );
  }

  ngOnInit() {
  }

}
