import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material';
import {RestService} from '../../rest.service';


export class Email {
  value: string;

  constructor(value: string) {
    this.value = value;
  }
}

@Component({
  selector: 'app-audit-settings',
  templateUrl: './audit-settings.component.html',
  styleUrls: ['./audit-settings.component.css']
})
export class AuditSettingsComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  auditBackup = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.maxLength]],
  });

  constructor(private fb: FormBuilder, public snackBar: MatSnackBar, private rest: RestService) {
  }

  ngOnInit() {
  }

  onSubmitAuditBackup(input) {
    this.rest.auditBackup(this.mapToEmail(input)).subscribe(data => {
      console.log(data);
      if (data.result === true) {
        this.openSnackBar('Audit email sent', 'OK');
      }
    });
  }

  private mapToEmail(input) {
    return new Email(input.email);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
