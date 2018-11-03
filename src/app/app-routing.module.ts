import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NhieComponent } from './games/nhie/nhie.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import {GamesComponent} from './games/games.component';

const routes: Routes = [
  {
    path: '',
    component: GamesComponent
  },

  {
    path: 'nhie',
    component: NhieComponent
  },
  
  {
    path: '**',
    component: PageNotFoundComponent,
  }
];
