import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FireauthService {

  private auth;

  constructor(
    private afAuth: AngularFireAuth,
  ) {
    this.auth = afAuth.auth;
  }

  get isLoggedIn() {
    return !!this.auth.currentUser;
  }

  get authUser() {
    return this.afAuth.authState;
  }

  loginAnonymous() {
    return this.auth.signInAnonymouslyAndRetrieveData();
  }

  loginEmailAndPassword(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }
}
