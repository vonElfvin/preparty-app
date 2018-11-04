import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NhieComponent } from './nhie.component';
import { NhieGameInstanceService } from './shared/nhieGameInstance.service';
import {MatButtonModule, MatCardModule, MatInputModule, MatSliderModule} from '@angular/material';
import { NhieCardComponent } from './nhie-card/nhie-card.component';
import {FormsModule} from '@angular/forms';
import { AddQuestionsComponent } from './add-questions/add-questions.component';
import { AddQuestionButtonComponent } from './add-question-button/add-question-button.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { AddManualQuestionComponent } from './add-manual-question/add-manual-question.component';

@NgModule({
  declarations: [NhieComponent, NhieCardComponent, AddQuestionsComponent, AddQuestionButtonComponent, AddManualQuestionComponent],
  exports: [AddQuestionsComponent],
  providers: [NhieGameInstanceService],
  imports: [
    FormsModule,
    CommonModule,

    // Material
    MatCardModule,
    MatButtonModule,
    MatButtonModule,
    MatInputModule,
    FlexLayoutModule
  ]
})
export class NhieModule { }
