import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {VotingGameComponent} from './voting-game.component';
import {SharedModule} from '../../shared/shared.module';
import {PartyModule} from '../../party/party.module';
import {MatButtonModule, MatCardModule} from '@angular/material';
import {ChartsModule} from 'ng2-charts';

@NgModule({
  declarations: [VotingGameComponent],
  imports: [
    CommonModule,
    SharedModule,
    PartyModule,

    ChartsModule,

    MatCardModule,
    MatButtonModule
  ]
})
export class VotingGameModule { }
