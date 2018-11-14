import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NhieComponent } from './games/nhie/nhie.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { GamesComponent} from './games/games.component';
import { LobbyComponent} from './party/lobby/lobby.component';
import { AliasComponent } from './party/alias/alias.component';
import {GameInfoComponent} from './party/game-info/game-info.component';

const routes: Routes = [
  {
    path: '',
    component: GamesComponent
  },
  {
    path: 'alias',
    component: AliasComponent
  },
  {
    path: 'alias/:joinCode',
    component: AliasComponent
  },
  {
    path: 'nhie/:joinCode',
    component: NhieComponent
  },
  {
    path: 'nhie',
    component: NhieComponent
  },
  {
    path: 'lobby/:joinCode',
    component: LobbyComponent
  },
  {
    path: 'lobby',
    component: LobbyComponent
  },
  {
    path: 'game-info/:gameId',
    component: GameInfoComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
