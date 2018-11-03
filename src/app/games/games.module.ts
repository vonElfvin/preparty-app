import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NhieModule } from './nhie/nhie.module';
import { GamesComponent } from './games.component';
import { MatFormField, MatFormFieldModule, MatButton, MatButtonModule, MatInputModule, MatDividerModule } from '@angular/material';
import { FireauthService } from '../core/firebase/fireauth/fireauth.service';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [GamesComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDividerModule,
    FormsModule,
    
    // Game Modules
    NhieModule,
  ],
  providers: [
    FireauthService
  ]
})
export class GamesModule { }
