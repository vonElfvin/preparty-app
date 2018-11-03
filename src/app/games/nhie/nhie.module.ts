import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NhieComponent } from './nhie.component';
import { NhieService } from './shared/nhie.service';

@NgModule({
  declarations: [NhieComponent],
  providers: [NhieService],
  imports: [
    CommonModule
  ]
})
export class NhieModule { }
