import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Router, Event, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  loading = new BehaviorSubject(false);

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.stopLoad();
      }
    });
  }

  get loader() {
    return this.loading.asObservable();
  }

  load() {
    this.loading.next(true);
    console.log(this.loading);
  }

  stopLoad() {
    this.loading.next(false);
  }
}
