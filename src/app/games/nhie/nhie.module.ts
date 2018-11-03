import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NhieComponent } from './nhie.component';
import { NhieService } from './shared/nhie.service';
import {MatButtonModule, MatCardModule} from '@angular/material';
import { NhieCardComponent } from './nhie-card/nhie-card.component';

@NgModule({
  declarations: [NhieComponent, NhieCardComponent],
  providers: [NhieService],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatButtonModule
  ]
})
export class NhieModule { }
