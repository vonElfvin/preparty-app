import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NhieComponent} from './games/nhie/nhie.component';
import {GamesComponent} from './games/games.component';

const routes: Routes = [
  {path: '', component: GamesComponent},
  {path: 'nhie', component: NhieComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
