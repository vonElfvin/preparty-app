import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { NhieModule } from '../games/nhie/nhie.module';

@NgModule({
  declarations: [AdminComponent, AdminLoginComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,

    // Material
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,

    // Custom
    NhieModule,
  ]
})
export class AdminModule { }
