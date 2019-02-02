import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {RestService} from '../../rest.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Customer} from '../customers/customers.component';
import {LangService} from "../../lang.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-customer-detail',
    templateUrl: './customer-detail.component.html',
    styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

    customerDetailsForm = this.fb.group({
        uuid: [null],
        name: ['', Validators.required],
        companyIdentificationNumber: ['', Validators.required],
        taxIdentificationNumber: ['', Validators.required],
        addressUuid: [null],
        street: ['', Validators.required],
        houseNumber: ['', Validators.required],
        postalCode: ['', Validators.required],
        town: ['', Validators.required],
        country: ['', Validators.required],
        bankName: ['', Validators.required],
        iban: ['', Validators.required],
        bankAccountUuid: [null],
    });

    constructor(private fb: FormBuilder, private rest: RestService, private router: Router, private route: ActivatedRoute, private translate: TranslateService) {
        translate.setDefaultLang(LangService.getLanguage());
    }

    ngOnInit() {
        if (this.route.snapshot.params['uuid'] !== 'new-customer') {
            this.getCustomerDetail();
        }
    }

    getCustomerDetail() {
        this.rest.getCustomer(this.route.snapshot.params['uuid']).subscribe((data: {}) => {
            this.mapFromCustomer(data);
        });
    }

    onSubmitCustomerDetailsForm(data) {
        this.rest.updateCustomer(this.mapToCustomer(this.customerDetailsForm.getRawValue())).subscribe(() => {
            this.router.navigate(['customers']);
        });
    }

    mapFromCustomer(data) {
        this.customerDetailsForm.controls['uuid'].setValue(data.uuid);
        this.customerDetailsForm.controls['name'].setValue(data.name);
        this.customerDetailsForm.controls['companyIdentificationNumber'].setValue(data.companyIdentificationNumber);
        this.customerDetailsForm.controls['taxIdentificationNumber'].setValue(data.taxIdentificationNumber);
        this.customerDetailsForm.controls['addressUuid'].setValue(data.address.uuid);
        this.customerDetailsForm.controls['street'].setValue(data.address.street);
        this.customerDetailsForm.controls['houseNumber'].setValue(data.address.houseNumber);
        this.customerDetailsForm.controls['postalCode'].setValue(data.address.postalCode);
        this.customerDetailsForm.controls['town'].setValue(data.address.town);
        this.customerDetailsForm.controls['country'].setValue(data.address.country);
        this.customerDetailsForm.controls['bankAccountUuid'].setValue(data.bankAccount.uuid);
        this.customerDetailsForm.controls['bankName'].setValue(data.bankAccount.bankName);
        this.customerDetailsForm.controls['iban'].setValue(data.bankAccount.iban);
    }

    mapToCustomer(data) {
        return new Customer(
            data.uuid,
            data.name,
            data.companyIdentificationNumber,
            data.taxIdentificationNumber,
            data.addressUuid,
            data.street,
            data.houseNumber,
            data.postalCode,
            data.town,
            data.country,
            data.bankAccountUuid,
            data.bankName,
            data.iban
        );
    }

}
