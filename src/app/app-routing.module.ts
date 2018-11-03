import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NhieComponent} from './games/nhie/nhie.component';

const routes: Routes = [{path: 'nhie', component: NhieComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
