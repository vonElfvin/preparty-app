import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LobbyComponent } from './lobby/lobby.component';
import {
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatFormFieldModule, MatGridListModule,
  MatIconModule,
  MatInputModule, MatTabsModule
} from '@angular/material';
import { PartyService } from './shared/party.service';
import { AliasComponent } from './alias/alias.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GameInfoComponent } from './game-info/game-info.component';
import { InviteComponent } from './invite/invite.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    LobbyComponent,
    AliasComponent,
    GameInfoComponent,
    InviteComponent,
    HomeComponent
  ],
  exports: [LobbyComponent,
    InviteComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FlexLayoutModule,
    // Own module
    SharedModule,

    // Material
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    MatIconModule,
    MatGridListModule,
    MatTabsModule
  ],
  providers: [PartyService]
})
export class PartyModule { }
