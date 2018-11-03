import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NhieModule } from './nhie/nhie.module';
import { GamesComponent } from './games.component';

@NgModule({
  declarations: [GamesComponent],
  imports: [
    CommonModule,

    // Game Modules
    NhieModule,
  ]
})
export class GamesModule { }
