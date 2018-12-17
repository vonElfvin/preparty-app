import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DefaultSizeButtonComponent } from './default-size-button/default-size-button.component';
import {MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatMenuModule, MatTooltipModule} from '@angular/material';
import { FooterImageComponent } from './footer-image/footer-image.component';
import { RouterModule } from '@angular/router';
import { BackButtonComponent } from './back-button/back-button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameCodeComponent } from './game-code/game-code.component';
import { MenuButtonComponent } from './menu-button/menu-button.component';
import { BackgroundColourDirective } from './background-colour.directive';
import { TruncatePipe } from './truncate-pipe/truncate.pipe';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    DefaultSizeButtonComponent,
    FooterImageComponent,
    BackButtonComponent,
    GameCodeComponent,
    MenuButtonComponent,
    BackButtonComponent,
    BackgroundColourDirective,
    TruncatePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatMenuModule,
    MatInputModule,
    MatTooltipModule,
    ReactiveFormsModule
  ],
  exports: [
    FooterImageComponent,
    BackButtonComponent,
    DefaultSizeButtonComponent,
    GameCodeComponent,
    MenuButtonComponent,
    BackgroundColourDirective,
    TruncatePipe
  ]
})
export class SharedModule { }
