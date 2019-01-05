import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {FormBuilder} from '@angular/forms';
import {ErrorStateMatcher, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material';
import {RestService} from '../../rest.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  hideOld = true;
  hideNew = true;
  hideNewAgain = true;
  matcher = new MyErrorStateMatcher();

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  userPasswordForm = this.fb.group({
    passwordOld: ['', Validators.required],
    passwordNew: ['', Validators.required],
    passwordNewAgain: ['', Validators.required],
  }, {validator: this.checkPasswords});


  userDetailsForm = this.fb.group({
    username: [{value: '', disabled: true}, Validators.required],
    name: ['', Validators.required],
    email: ['', Validators.required],
    phone: [''],
  });

  constructor(private fb: FormBuilder, public snackBar: MatSnackBar, private rest: RestService) {
  }

  ngOnInit() {
    this.getUserByToken();
  }

  getUserByToken() {
    this.rest.getUserByToken().subscribe((data: {}) => {
      this.mapFromUser(data);
    });
  }

  onSubmitUserPasswordForm(data) {
    console.log(data);
    this.openSnackBar('Sprava', 'OK');
  }

  onSubmitUserDetailsForm(data) {
    console.log(data);
    this.openSnackBar('dopln serverovu metodu na ulozenie pouzivatela!!!', 'OK');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  checkPasswords(group: FormGroup) {
    const pass = group.controls.passwordNew.value;
    const confirmPass = group.controls.passwordNewAgain.value;

    return pass === confirmPass ? null : {notSame: true};
  }

  private mapFromUser(data: {}) {
    this.userDetailsForm.controls['username'].setValue(data.login);
    this.userDetailsForm.controls['name'].setValue(data.name);
    this.userDetailsForm.controls['email'].setValue(data.email);
    this.userDetailsForm.controls['phone'].setValue(data.phone);
  }
}
