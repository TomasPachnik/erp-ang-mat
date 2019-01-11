import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {RestService} from '../../rest.service';
import {ActivatedRoute, Router} from '@angular/router';


export class User {
  uuid: string;
  login: string;
  name: string;
  email: string;
  phone: string;
  enabled: string;

  constructor(uuid: string, login: string, name: string, email: string, phone: string, enabled: string) {
    this.uuid = uuid;
    this.login = login;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.enabled = enabled;
  }
}

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  userDetailsForm = this.fb.group({
    uuid: [null],
    username: ['', Validators.required],
    name: ['', Validators.required],
    email: ['', Validators.required],
    phone: [''],
    enabled: [false, Validators.required]
  });

  constructor(private fb: FormBuilder, private rest: RestService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    if (this.route.snapshot.params['uuid'] !== 'new-user') {
      this.getUserDetail();
    }
  }

  getUserDetail() {
    this.rest.getUser(this.route.snapshot.params['uuid']).subscribe((data: {}) => {
      this.mapFromUser(data);
    });
  }

  onSubmitUserDetailsForm(input) {
    this.rest.updateUser(this.mapToUser(input)).subscribe(() => {
      this.router.navigate(['users']);
    });
  }

  mapToUser(input) {
    return new User(
      input.uuid,
      this.userDetailsForm.controls['username'].value,
      input.name,
      input.email,
      input.phone,
      input.enabled
    );
  }

  mapFromUser(input) {
    this.userDetailsForm.controls['uuid'].setValue(input.uuid);
    this.userDetailsForm.controls['username'].setValue(input.login);
    if (input.login === 'admin') {
      this.userDetailsForm.controls['username'].disable();
      this.userDetailsForm.controls['enabled'].disable();
    } else {
      this.userDetailsForm.controls['username'].enable();
      this.userDetailsForm.controls['enabled'].enable();
    }
    this.userDetailsForm.controls['name'].setValue(input.name);
    this.userDetailsForm.controls['email'].setValue(input.email);
    this.userDetailsForm.controls['phone'].setValue(input.phone);
    this.userDetailsForm.controls['enabled'].setValue(input.enabled + '');
  }

}
