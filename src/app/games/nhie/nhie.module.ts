import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NhieComponent } from './nhie.component';
import { NhieGameInstanceService } from './shared/nhie-game-instance.service';
import {MatButtonModule, MatCardModule, MatIconModule, MatInputModule} from '@angular/material';
import { NhieCardComponent } from './nhie-card/nhie-card.component';
import {FormsModule} from '@angular/forms';
import { AddQuestionsComponent } from './add-questions/add-questions.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { AddManualQuestionComponent } from './add-manual-question/add-manual-question.component';
import {RouterModule} from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import {PartyModule} from '../../party/party.module';

@NgModule({
  declarations: [
    NhieComponent,
    NhieCardComponent,
    AddQuestionsComponent,
    AddManualQuestionComponent
  ],
  exports: [AddQuestionsComponent],
  providers: [NhieGameInstanceService],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,

    // Own Modules
    SharedModule,
    PartyModule,

    // Material
    MatCardModule,
    MatButtonModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    RouterModule,
    FlexLayoutModule
  ]
})
export class NhieModule { }
