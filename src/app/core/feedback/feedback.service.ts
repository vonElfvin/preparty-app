import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { FeedbackMessage, FeedbackType } from './feedback.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private snackbarConfig = new MatSnackBarConfig();

  constructor(
    private snackbar: MatSnackBar,
  ) {
    this.snackbarConfig.duration = 2500;
  }

  message(message: FeedbackMessage, type: FeedbackType, customMessage?: string) {

    // type
    this.snackbarConfig.panelClass = ['snackbar', type.toString()];

    // message
    const snackbarMessage = message === FeedbackMessage.Custom ? customMessage : message.toString();
    this.snackbar.open(snackbarMessage, null, this.snackbarConfig);
  }
}
