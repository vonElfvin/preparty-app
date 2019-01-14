import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseModule } from './firebase/firebase.module';
import { AuthService } from './auth/auth.service';
import { MatSnackBarModule } from '@angular/material';
import { FeedbackService } from './feedback/feedback.service';
import { SpinnerService } from './spinner/spinner.service';

@NgModule({
  declarations: [],
  providers: [AuthService, FeedbackService, SpinnerService],
  imports: [
    CommonModule,
    FirebaseModule,
    MatSnackBarModule,
  ]
})
export class CoreModule { }
