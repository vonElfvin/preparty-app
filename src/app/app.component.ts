import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth/auth.service';
import { Observable } from 'rxjs';
import { User } from './core/auth/user.model';
import { SpinnerService } from './core/spinner/spinner.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  userObservable: Observable<User>;
  loading: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private spinnerService: SpinnerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loading = this.spinnerService.loader;
    this.userObservable = this.authService.user;
    this.userObservable.subscribe(user => {
      console.log(user);
    });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        (<any>window).ga('set', 'page', event.urlAfterRedirects);
        (<any>window).ga('send', 'pageview');
      }
    });
  }
}
