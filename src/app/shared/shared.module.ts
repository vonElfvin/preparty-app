import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DefaultSizeButtonComponent } from './default-size-button/default-size-button.component';
import {MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatMenuModule} from '@angular/material';
import { FooterImageComponent } from './footer-image/footer-image.component';
import { RouterModule } from '@angular/router';
import { BackButtonComponent } from './back-button/back-button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuButtonComponent } from './menu-button/menu-button.component';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    DefaultSizeButtonComponent,
    FooterImageComponent,
    MenuButtonComponent,
    BackButtonComponent
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
    ReactiveFormsModule
  ],
  exports: [
    FooterImageComponent,
    BackButtonComponent,
    DefaultSizeButtonComponent,
    MenuButtonComponent
  ]
})
export class SharedModule { }
