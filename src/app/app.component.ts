import { Component, OnInit } from '@angular/core';
import { FeedbackService } from './core/feedback/feedback.service';
import { AuthService } from './core/auth/auth.service';
import { FireauthService } from './core/firebase/fireauth/fireauth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private feedbackService: FeedbackService,
    private authService: AuthService,
    private fireauthService: FireauthService,
  ) { }

  ngOnInit() {
    this.authService.loginAnonymously();
  }
}
