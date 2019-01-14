import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth/auth.service';
import { Observable } from 'rxjs';
import { User } from './core/auth/user.model';
import { SpinnerService } from './core/spinner/spinner.service';

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
    private spinnerService: SpinnerService
  ) { }

  ngOnInit() {
    this.loading = this.spinnerService.loader;
    this.userObservable = this.authService.user;
    this.userObservable.subscribe(user => {
      console.log(user);
    });
  }
}
