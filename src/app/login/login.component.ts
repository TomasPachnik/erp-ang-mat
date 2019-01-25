import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {AuthService} from './../auth/auth.service';
import {MatProgressButtonOptions} from 'mat-progress-buttons';
import {TranslateService} from '@ngx-translate/core';
import {LangService} from '../lang.service';

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
    text: '',
    spinnerSize: 19,
    raised: true,
    stroked: true,
    buttonColor: 'primary',
    spinnerColor: 'accent',
    fullWidth: false,
    disabled: false,
    mode: 'indeterminate',
  };

  constructor(private fb: FormBuilder, private authService: AuthService, private translate: TranslateService,) {
    translate.setDefaultLang(LangService.getLanguage());
    translate.get('login.submit').subscribe((translated: string) => {
      this.btnOpts.text = translated;
    });
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

  getYear() {
    return (new Date()).getFullYear();
  }

}
