import { Injectable } from '@angular/core';
import { FireauthService } from '../firebase/fireauth/fireauth.service';
import { FeedbackService } from '../feedback/feedback.service';
import { FeedbackMessage, FeedbackType } from '../feedback/feedback.model';
import { FirestoreService } from '../firebase/firestore/firestore.service';
import { Observable, of } from 'rxjs';
import {switchMap, map, take} from 'rxjs/operators';
import { Role, User } from './user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly path: string = 'user';
  private userObservable: Observable<User>;

  constructor(
    private fireauthService: FireauthService,
    private feedbackService: FeedbackService,
    private firestoreService: FirestoreService<User>,
    private router: Router,
  ) {
    this.setUser();
  }

  get user() {
    return this.userObservable;
  }

  get isAdmin(): Observable<boolean> {
    return this.user.pipe(
      map(user => user && user.role === Role.admin)
    );
  }

  get isLoggedIn(): Observable<boolean> {
    return this.user.pipe(
      map(user => !!user)
    );
  }

  loginEmailAndPassword(email, password) {
    this.fireauthService.loginEmailAndPassword(email, password).then(() => {
      this.feedbackService.message(FeedbackMessage.Login, FeedbackType.Primary);
      this.router.navigate(['admin/nhie-questions']);
    }).catch(() => {
      this.feedbackService.message(FeedbackMessage.ErrorLogin, FeedbackType.Error);
    });
  }

  loginAnonymously(): Promise<User> {
    return this.fireauthService.loginAnonymously().then((res) => {
      const id = res.user.uid;
      return this.firestoreService.upsert(this.path, id, {id: id}).then(() => {
        return this.userObservable.pipe(take(1)).toPromise();
      });
    }).catch((err) => {
      console.log('Error in logging in anonymously:', err);
    });
  }

  setUser() {
    this.userObservable = this.fireauthService.authUser.pipe(
      switchMap(authUser => {
        if (authUser) {
          return this.firestoreService.get(this.path, authUser.uid);
        } else {
          return of(null);
        }
      })
    );
  }
}
