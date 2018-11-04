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

  get uid() {
    return this.auth.currentUser.uid;
  }

  get authUser() {
    return this.afAuth.authState;
  }

  loginAnonymously() {
    return this.auth.signInAnonymously();
  }

  loginEmailAndPassword(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut().then(() => {
      console.log('logged out');
    });
  }
}
