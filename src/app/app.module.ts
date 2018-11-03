import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { GamesModule } from './games/games.module';
import {PartyModule} from './party/party.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Custom
    AdminModule,
    CoreModule,
    SharedModule,
    GamesModule,
    PartyModule,
    AppRoutingModule,

    // Angular Imports
    BrowserModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
