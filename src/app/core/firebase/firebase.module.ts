import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FireauthService } from './fireauth/fireauth.service';
import { FirestoreService } from './firestore/firestore.service';

@NgModule({
  declarations: [],
  providers: [FireauthService, FirestoreService],
  imports: [
    CommonModule
  ]
})
export class FirebaseModule { }
