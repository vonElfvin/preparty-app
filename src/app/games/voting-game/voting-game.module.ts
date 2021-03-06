import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {VotingGameComponent} from './voting-game.component';
import {SharedModule} from '../../shared/shared.module';
import {PartyModule} from '../../party/party.module';

@NgModule({
  declarations: [VotingGameComponent],
  imports: [
    CommonModule,
    SharedModule,
    PartyModule,
  ]
})
export class VotingGameModule { }
