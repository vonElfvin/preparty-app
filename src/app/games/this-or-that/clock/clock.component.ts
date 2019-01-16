import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Observable, timer} from 'rxjs';
import {map, take} from 'rxjs/operators';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {

  @ViewChild('circle') el: ElementRef;

  counter$: Observable<number>;

  private _count: number;

  @Output()
  countdownFinished = new EventEmitter();

  @Input()
  set count(count: number) {
    this.startCount(count);
  }

  countCss: string;

  constructor() {
  }

  ngOnInit() {
  }

  startCount(count: number) {
    this._count = count;
    this.countCss = '';
    this.countCss = `countdown ${this._count}s linear forwards`;
    this.el.nativeElement.classList.remove('animation');
    this.el.nativeElement.style.annimation = this.countCss;

    this.counter$ = timer(0, 1000).pipe(
      take(this._count),
      map(() => {
        this._count--;
        if (this._count <= 0) {
          this.countdownFinished.emit('Done!');
        }
        return this._count;
      })
    );
  }

}
