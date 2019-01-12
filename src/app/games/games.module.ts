import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NhieModule } from './nhie/nhie.module';
import {
  MatFormFieldModule, MatInputModule, MatDividerModule, MatCardModule, MatGridListModule, MatIconModule
} from '@angular/material';
import { FireauthService } from '../core/firebase/fireauth/fireauth.service';
import { FormsModule } from '@angular/forms';

import { GameInstanceService } from './shared/game-instance.service';
import { GameService } from './shared/game.service';
import { SharedModule } from '../shared/shared.module';
import { VotingGameComponent } from './voting-game/voting-game.component';
import { GamesComponent } from './games.component';
import {PartyModule} from '../party/party.module';
import {VotingGameModule} from './voting-game/voting-game.module';

@NgModule({
  declarations: [
    GamesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    // Material
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,

    // Util Modules
    SharedModule,
    PartyModule,
    // Game Modules
    NhieModule,
    VotingGameModule
  ],
  providers: [
    GameService,
    GameInstanceService,
    FireauthService]
})
export class GamesModule { }
