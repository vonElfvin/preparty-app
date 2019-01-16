import { Component, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {

  counter$: Observable<number>;
  count = 4;

  constructor() {
    this.counter$ = timer(0, 1000).pipe(
      take(this.count),
      map(() => (this.count !== 1) ? --this.count : this.count)
    );
   }

  ngOnInit() {
  }

}
