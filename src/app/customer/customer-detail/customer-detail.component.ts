import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  customerDetailsForm = this.fb.group({
    name: ['', Validators.required],
    companyIdentificationNumber: ['', Validators.required],
    taxIdentificationNumber: ['', Validators.required],
    street: ['', Validators.required],
    houseNumber: ['', Validators.required],
    postalCode: ['', Validators.required],
    town: ['', Validators.required],
    country: ['', Validators.required],
    bankName: ['', Validators.required],
    iban: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
  }

  onSubmitCustomerDetailsForm(data) {
    console.log(data);
    this.customerDetailsForm.controls['name'].setValue('meno');
  }

}
