import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { FeedbackService } from '../../feedback/feedback.service';
import { FeedbackMessage, FeedbackType } from '../../feedback/feedback.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private feedbackService: FeedbackService,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAdmin.pipe(
      tap(isAdmin => {
        if (!isAdmin) {
          this.feedbackService.message(FeedbackMessage.Admin, FeedbackType.Error);
        }
      })
    );
  }
}
