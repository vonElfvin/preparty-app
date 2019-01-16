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

  private _count: number;

  @Input()
  set count(count: number) {
    this._count = count;
    this.countCss = `countdown ${this._count}s linear forwards`;
    this.counter$ = timer(0, 1000).pipe(
      take(this._count),
      map(() => --this._count)
    );
  }

  countCss: string;

  constructor() {

  }

  ngOnInit() {
  }

}
