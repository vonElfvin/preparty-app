import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FireauthService } from './fireauth/fireauth.service';
import { FirestoreService } from './firestore/firestore.service';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

@NgModule({
  declarations: [],
  providers: [FireauthService, FirestoreService],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ]
})
export class FirebaseModule { }
