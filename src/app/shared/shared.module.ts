import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DefaultSizeButtonComponent } from './default-size-button/default-size-button.component';
import { MatIconModule, MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    DefaultSizeButtonComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    DefaultSizeButtonComponent
  ]
})
export class SharedModule { }
