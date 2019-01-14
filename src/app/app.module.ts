import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { GamesModule } from './games/games.module';
import { PartyModule } from './party/party.module';
import { GestureConfig } from '@angular/material';
import { DebugInfoComponent } from './debug-info/debug-info.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    DebugInfoComponent
  ],
  imports: [
    // Custom
    AdminModule,
    CoreModule,
    SharedModule,
    PartyModule,
    GamesModule,
    AppRoutingModule,

    // Angular Imports
    BrowserModule,
    BrowserAnimationsModule,
    ServiceWorkerModule,
    RouterModule
  ],
  providers: [{ provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig }],
  bootstrap: [AppComponent]
})
export class AppModule { }
