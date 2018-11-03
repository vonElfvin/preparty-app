import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth/auth.service';
import { Observable } from 'rxjs';
import { User } from './core/auth/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private user: Observable<User>;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.user = this.authService.user;
  }
}
