import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NhieComponent} from './games/nhie/nhie.component';
import {LobbyComponent} from './party/lobby/lobby.component';

const routes: Routes = [{path: 'nhie', component: NhieComponent},
  {path: 'lobby', component: LobbyComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
