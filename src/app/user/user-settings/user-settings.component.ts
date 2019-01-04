import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {FormBuilder} from '@angular/forms';
import {ErrorStateMatcher, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material';

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
    phone: ['', Validators.required],
    active: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, public snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  onSubmitUserPasswordForm(data) {
    console.log(data);
    this.openSnackBar('Sprava', 'OK');
  }

  onSubmitUserDetailsForm(data) {
    console.log(data);
    this.openSnackBar('Sprava', 'OK');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const pass = group.controls.passwordNew.value;
    const confirmPass = group.controls.passwordNewAgain.value;

    return pass === confirmPass ? null : {notSame: true};
  }

}
