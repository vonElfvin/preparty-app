import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DefaultSizeButtonComponent } from './default-size-button/default-size-button.component';
import { MatIconModule, MatButtonModule } from '@angular/material';
import { FooterImageComponent } from './footer-image/footer-image.component';
import { RouterModule } from '@angular/router';
import { BackButtonComponent } from './back-button/back-button.component';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    DefaultSizeButtonComponent,
    FooterImageComponent,
    BackButtonComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    FooterImageComponent,
    BackButtonComponent,
    DefaultSizeButtonComponent]
})
export class SharedModule { }
