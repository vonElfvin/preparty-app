import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent {

  form = new FormGroup({
    email: new FormControl('',
      [Validators.required, Validators.email],
    ),
    password: new FormControl('',
      [Validators.required],
    ),
  });

  constructor(private authService: AuthService) { }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  login() {
    this.authService.loginEmailAndPassword(this.email.value, this.password.value);
  }
}
