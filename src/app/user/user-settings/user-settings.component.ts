import {Component, OnInit} from '@angular/core';
import {Validators, FormControl} from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  hideOld = true;
  hideNew = true;
  hideNewAgain = true;

  userPasswordForm = this.fb.group({
    passwordOld: ['', Validators.required],
    passwordNew: ['', Validators.required],
    passwordNewAgain: ['', Validators.required],
  });


  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
  }

  onSubmitUserPasswordForm(data){
    console.log(data);
  }

}
