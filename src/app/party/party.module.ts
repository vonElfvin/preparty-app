import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LobbyComponent } from './lobby/lobby.component';
import {MatButtonModule, MatCardModule, MatDividerModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {PartyService} from './shared/party.service';
import { AliasComponent } from './alias/alias.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [LobbyComponent, AliasComponent],
  imports: [
    CommonModule,
    FormsModule,

    // Material
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule
  ],
  providers: [PartyService],
  exports: [LobbyComponent]
})
export class PartyModule { }
