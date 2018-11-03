import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NhieComponent } from './games/nhie/nhie.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { GamesComponent} from './games/games.component';
import { LobbyComponent} from './party/lobby/lobby.component';
import { AliasComponent } from './games/alias/alias.component';

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
    path: 'nhie/:id',
    component: NhieComponent
  },
  {
    path: 'nhie',
    component: NhieComponent
  },
  {
    path: 'lobby/:id',
    component: LobbyComponent},
  {
    path: 'lobby',
    component: LobbyComponent},
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
