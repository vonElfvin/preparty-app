import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {GamesComponent} from './games.component';
import {NhieComponent} from './nhie/nhie.component';
import {VotingGameComponent} from './voting-game/voting-game.component';

const routes: Routes = [
  {path: 'game', component: GamesComponent, children: [
      { path: 'nhie/:joinCode', component: NhieComponent},
      { path: 'nhie', component: NhieComponent },
      { path: 'voting/:joinCode', component: VotingGameComponent},
      { path: 'voting', component: VotingGameComponent},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
