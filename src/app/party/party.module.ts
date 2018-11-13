import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LobbyComponent } from './lobby/lobby.component';
import {MatButtonModule, MatCardModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import {PartyService} from './shared/party.service';
import { AliasComponent } from './alias/alias.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { GameCodeComponent } from './shared/game-code/game-code.component';
import { SharedModule } from '../shared/shared.module';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [LobbyComponent, AliasComponent, GameCodeComponent],
  imports: [
    CommonModule,
    FormsModule,

    // Own module
    SharedModule,

    // Material
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    MatIconModule,
    RouterModule,
    FlexLayoutModule
  ],
  providers: [PartyService],
  exports: [LobbyComponent]
})
export class PartyModule { }
