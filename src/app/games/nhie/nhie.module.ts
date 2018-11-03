import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NhieComponent } from './nhie.component';
import { NhieService } from './shared/nhie.service';
import {MatButtonModule, MatCardModule, MatInputModule} from '@angular/material';
import { NhieCardComponent } from './nhie-card/nhie-card.component';
import {FormsModule} from '@angular/forms';
import { AddQuestionsComponent } from './add-questions/add-questions.component';

@NgModule({
  declarations: [NhieComponent, NhieCardComponent, AddQuestionsComponent],
  exports: [AddQuestionsComponent],
  providers: [NhieService],
  imports: [
    FormsModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class NhieModule { }
