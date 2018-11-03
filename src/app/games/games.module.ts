import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NhieModule } from './nhie/nhie.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    // Game Modules
    NhieModule,
  ]
})
export class GamesModule { }
