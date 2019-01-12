import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NhieComponent } from './games/nhie/nhie.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { LobbyComponent} from './party/lobby/lobby.component';
import { AliasComponent } from './party/alias/alias.component';
import {GameInfoComponent} from './party/game-info/game-info.component';
import {HomeComponent} from './party/home/home.component';
import {GamesComponent} from './games/games.component';
import {VotingGameComponent} from './games/voting-game/voting-game.component';
import {WrapperComponent} from './party/wrapper/wrapper.component';
import {BackButtonComponent} from './shared/back-button/back-button.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: '',
    component: WrapperComponent,
    children: [
      {path: 'alias', component: AliasComponent},
      {path: 'alias/:joinCode', component: AliasComponent},
      {path: 'alias/:joinCode/:fromLink', component: AliasComponent},
      {path: 'lobby/:joinCode', component: LobbyComponent},
      {path: 'game-info/:gameId', component: GameInfoComponent},
      { path: 'game/nhie/:joinCode', component: NhieComponent},
      { path: 'game/nhie', component: NhieComponent },
      { path: 'voting/:joinCode', component: VotingGameComponent},
      { path: 'voting', component: VotingGameComponent},
    ]
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
    path: 'alias/:joinCode/:fromLink',
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
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
