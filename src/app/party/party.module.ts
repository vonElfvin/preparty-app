import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LobbyComponent } from './lobby/lobby.component';
import {MatButtonModule, MatCardModule, MatInputModule} from '@angular/material';
import {PartyService} from './shared/party.service';

@NgModule({
  declarations: [LobbyComponent],
  imports: [
    CommonModule,

    // Material
    MatButtonModule,
    MatCardModule,
    MatInputModule
  ],
  providers: [PartyService],
  exports: [LobbyComponent]
})
export class PartyModule { }
