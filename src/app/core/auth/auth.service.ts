import { Injectable } from '@angular/core';
import { FireauthService } from '../firebase/fireauth/fireauth.service';
import { FeedbackService } from '../feedback/feedback.service';
import { FeedbackMessage, FeedbackType } from '../feedback/feedback.model';
import { FirestoreService } from '../firebase/firestore/firestore.service';
import { Observable, of } from 'rxjs';
import { switchMap, map, take } from 'rxjs/operators';
import { Role, User } from './user.model';
import { Router } from '@angular/router';
import { Party } from '../../party/shared/party';

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

  get uid() {
    if (this.isLoggedIn()) {
      return this.fireauthService.uid;
    }
    return null;
  }

  get isAdmin(): Observable<boolean> {
    return this.user.pipe(
      map(user => user && user.role === Role.admin)
    );
  }

  get isLoggedInObservable(): Observable<boolean> {
    return this.user.pipe(
      map(user => !!user)
    );
  }

  isLoggedIn(): boolean {
    return this.fireauthService.isLoggedIn;
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
      return this.firestoreService.upsert(this.path, id, { id: id }).then(() => {
        return this.userObservable.pipe(take(1)).toPromise();
      });
    }).catch((err) => {
      console.log('Error in logging in anonymously:', err);
    });
  }

  getUsersByPartyId(partyId: string) {
    return this.firestoreService.list(this.path, ref => ref
      .where('partyId', '==', partyId));
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

  upsertUserAlias(alias: string) {
    return this.firestoreService.upsert(this.path, this.uid, { alias: alias });
  }

  upsertUserParty(partyId: string) {
    this.firestoreService.upsert(this.path, this.uid, { partyId: partyId });
  }

  joinParty(party: Party) {
    return this.firestoreService.upsert(this.path, this.uid, {partyId: party.id});
  }

  removePartyId(): Promise<any> {
    return this.firestoreService.upsert(this.path, this.uid, {partyId: null});
  }

}
