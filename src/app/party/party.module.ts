import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LobbyComponent } from './lobby/lobby.component';
import {MatButtonModule, MatCardModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import {PartyService} from './shared/party.service';
import { AliasComponent } from './alias/alias.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LobbyComponent, AliasComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,

    // Material
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    MatIconModule,
    RouterModule
  ],
  providers: [PartyService],
  exports: [LobbyComponent]
})
export class PartyModule { }
