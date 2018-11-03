import { Component, OnInit } from '@angular/core';
import { FeedbackService } from './core/feedback/feedback.service';
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
    private feedbackService: FeedbackService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.authService.loginAnonymously();
    this.user = this.authService.user;
  }
}
