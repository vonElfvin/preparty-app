import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NhieModule } from './nhie/nhie.module';
import { GamesComponent } from './games.component';
import { MatFormField, MatFormFieldModule, MatButton, MatButtonModule, MatInputModule, MatDividerModule } from '@angular/material';
import {GameInstanceService} from './shared/game-instance.service';

@NgModule({
  declarations: [GamesComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDividerModule,

    // Game Modules
    NhieModule,
  ],
  providers: [GameInstanceService]
})
export class GamesModule { }
