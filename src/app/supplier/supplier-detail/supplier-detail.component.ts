import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {RestService} from '../../rest.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Supplier} from '../suppliers/suppliers.component';
import {LangService} from "../../lang.service";
import {AuthService} from "../../auth/auth.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-supplier-detail',
    templateUrl: './supplier-detail.component.html',
    styleUrls: ['./supplier-detail.component.css']
})
export class SupplierDetailComponent implements OnInit {

    supplierDetailsForm = this.fb.group({
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
        if (this.route.snapshot.params['uuid'] !== 'new-supplier') {
            this.getSupplierDetail();
        }
    }

    getSupplierDetail() {
        this.rest.getSupplier(this.route.snapshot.params['uuid']).subscribe((data: {}) => {
            this.mapFromSupplier(data);
        });
    }

    onSubmitSupplierDetailsForm(data) {
        this.rest.updateSupplier(this.mapToSupplier(this.supplierDetailsForm.getRawValue())).subscribe(() => {
            this.router.navigate(['suppliers']);
        });
    }

    mapFromSupplier(data) {
        this.supplierDetailsForm.controls['uuid'].setValue(data.uuid);
        this.supplierDetailsForm.controls['name'].setValue(data.name);
        this.supplierDetailsForm.controls['companyIdentificationNumber'].setValue(data.companyIdentificationNumber);
        this.supplierDetailsForm.controls['taxIdentificationNumber'].setValue(data.taxIdentificationNumber);
        this.supplierDetailsForm.controls['addressUuid'].setValue(data.address.uuid);
        this.supplierDetailsForm.controls['street'].setValue(data.address.street);
        this.supplierDetailsForm.controls['houseNumber'].setValue(data.address.houseNumber);
        this.supplierDetailsForm.controls['postalCode'].setValue(data.address.postalCode);
        this.supplierDetailsForm.controls['town'].setValue(data.address.town);
        this.supplierDetailsForm.controls['country'].setValue(data.address.country);
        this.supplierDetailsForm.controls['bankAccountUuid'].setValue(data.bankAccount.uuid);
        this.supplierDetailsForm.controls['bankName'].setValue(data.bankAccount.bankName);
        this.supplierDetailsForm.controls['iban'].setValue(data.bankAccount.iban);
    }

    mapToSupplier(data) {
        return new Supplier(
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
