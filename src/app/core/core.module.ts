import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseModule } from './firebase/firebase.module';
import { AuthService } from './auth/auth.service';

@NgModule({
  declarations: [],
  providers: [AuthService],
  imports: [
    CommonModule,
    FirebaseModule,
  ]
})
export class CoreModule { }
