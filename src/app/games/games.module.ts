import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NhieModule } from './nhie/nhie.module';
import { GamesComponent } from './games.component';
import {
  MatFormFieldModule, MatButtonModule, MatInputModule, MatDividerModule, MatCardModule, MatGridListModule,
  MatIconModule
} from '@angular/material';
import { FireauthService } from '../core/firebase/fireauth/fireauth.service';
import { FormsModule } from '@angular/forms';

import { GameInstanceService } from './shared/game-instance.service';
import { GameService } from './shared/game.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    GamesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    // Material
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDividerModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,

    // Util Modules
    SharedModule,
    // Game Modules
    NhieModule,
  ],
  providers: [
    GameService,
    GameInstanceService,
    FireauthService]
})
export class GamesModule { }
