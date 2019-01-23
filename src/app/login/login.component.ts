import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {AuthService} from './../auth/auth.service';
import {MatProgressButtonOptions} from 'mat-progress-buttons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  incorrectLogin = false;

  btnOpts: MatProgressButtonOptions = {
    active: false,
    text: 'Login',
    spinnerSize: 19,
    raised: true,
    stroked: true,
    buttonColor: 'primary',
    spinnerColor: 'accent',
    fullWidth: false,
    disabled: false,
    mode: 'indeterminate',
  };

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
    this.btnOpts.active = true;
    const success = await this.authService.login(this.form.value);
    this.btnOpts.active = false;
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
