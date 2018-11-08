import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FooterImageComponent } from './footer-image/footer-image.component';
import {RouterModule} from '@angular/router';
import { BackButtonComponent } from './back-button/back-button.component';
import {MatButtonModule, MatIconModule} from '@angular/material';

@NgModule({
  declarations: [PageNotFoundComponent, FooterImageComponent, BackButtonComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [FooterImageComponent, BackButtonComponent]
})
export class SharedModule { }
