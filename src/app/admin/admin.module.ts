import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [AdminComponent, AdminLoginComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,

    // Material
    MatButtonModule,
  ]
})
export class AdminModule { }
