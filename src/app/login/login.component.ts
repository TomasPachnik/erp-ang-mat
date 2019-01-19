import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {AuthService} from './../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  incorrectLogin = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.login();
    }
  }

  async login() {
    const success = await this.authService.login(this.form.value);
    if (success !== true) {
      this.invalidLogin();
    }
  }

  invalidLogin() {
    setTimeout(() => {
      this.incorrectLogin = false;
    }, 1000);
    this.incorrectLogin = true;
  }
}
