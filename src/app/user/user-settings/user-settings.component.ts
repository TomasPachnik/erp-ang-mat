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

export class ChangeUser {
  name: string;
  email: string;
  phone: string;

  constructor(name: string, email: string, phone: string) {
    this.name = name;
    this.email = email;
    this.phone = phone;
  }
}

export class Password {
  oldPassword: string;
  newPassword: string;

  constructor(oldPassword: string, newPassword: string) {
    this.oldPassword = oldPassword;
    this.newPassword = newPassword;
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
    name: ['', [Validators.required, Validators.maxLength]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength]],
    phone: ['', Validators.maxLength],
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

  onSubmitUserPasswordForm(input) {
    this.rest.changePassword(new Password(input.passwordOld, input.passwordNew)).subscribe((data: {}) => {
      // @ts-ignore
      if (data.result === true) {
        this.openSnackBar('Password changed', 'OK');
      } else {
        this.openSnackBar('Password was not changed!!!', 'OK');
      }
    }, error => {
      this.openSnackBar(error.error.message, 'OK');
    });
  }

  onSubmitUserDetailsForm(input) {
    this.rest.updateCurrentUser(this.mapToChangeUser(input)).subscribe((data: {}) => {
      this.getUserByToken();
      this.openSnackBar('User data updated', 'OK');

    }, error => {
      this.openSnackBar(error.error.message, 'OK');
    });
  }

  private mapToChangeUser(input) {
    return new ChangeUser(
      input.name,
      input.email,
      input.phone
    );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
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
    // @ts-ignore
    this.userDetailsForm.controls['username'].setValue(data.username);
    // @ts-ignore
    this.userDetailsForm.controls['name'].setValue(data.name);
    // @ts-ignore
    this.userDetailsForm.controls['email'].setValue(data.email);
    // @ts-ignore
    this.userDetailsForm.controls['phone'].setValue(data.phone);
  }
}
