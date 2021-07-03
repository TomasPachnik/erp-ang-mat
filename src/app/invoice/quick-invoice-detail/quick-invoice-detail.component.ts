import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RestService} from '../../rest.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {LangService} from '../../lang.service';
import {Customer} from '../../customer/customers/customers.component';

export class Invoice {
  name: string;
  invoiceNumber: string;
  supplierVariableSymbol: string;
  currency: string;
  customer: Customer;
  supplier: string;
  dateOfIssue: Date;
  deliveryDate: Date;
  dueDate: Date;
  payDate: Date;
  note: string;
  assets: any;

  constructor(name: string, invoiceNumber: string, supplierVariableSymbol: string, currency: string, customer: Customer,
              supplier: string, dateOfIssue: Date, deliveryDate: Date, dueDate: Date, payDate: Date, note: string, assets: any) {
    this.name = name;
    this.invoiceNumber = invoiceNumber;
    this.supplierVariableSymbol = supplierVariableSymbol;
    this.currency = currency;
    this.customer = customer;
    this.supplier = supplier;
    this.dateOfIssue = dateOfIssue;
    this.deliveryDate = deliveryDate;
    this.dueDate = dueDate;
    this.payDate = payDate;
    this.note = note;
    this.assets = assets;
  }

}


@Component({
  selector: 'app-quick-invoice-detail',
  templateUrl: './quick-invoice-detail.component.html',
  styleUrls: ['./quick-invoice-detail.component.css']
})
export class QuickInvoiceDetailComponent implements OnInit {

  invoiceDetailsForm = this.fb.group({
    uuid: [null],
    name: ['', Validators.required],
    invoiceNumber: ['', Validators.required],
    supplierVariableSymbol: ['', Validators.required],
    currency: ['', Validators.required],
    customerName: ['', Validators.required],
    companyIdentificationNumber: [''],
    taxIdentificationNumber: [''],
    street: ['', Validators.required],
    houseNumber: ['', Validators.required],
    postalCode: ['', Validators.required],
    town: ['', Validators.required],
    country: ['', Validators.required],
    bankName: [''],
    iban: [''],
    supplier: ['', Validators.required],
    dateOfIssue: [new Date(), Validators.required],
    deliveryDate: ['', Validators.required],
    dueDate: ['', Validators.required],
    payDate: [''],
    note: [''],
  });

  assetForm: FormGroup;

  suppliers: any = [];

  constructor(private fb: FormBuilder, private rest: RestService, private router: Router,
              private route: ActivatedRoute, private translate: TranslateService) {
    translate.setDefaultLang(LangService.getLanguage());
  }

  ngOnInit() {
    this.getSuppliers();
    this.assetForm = this.fb.group({
      items: this.fb.array([])
    });
  }

  getSuppliers() {
    this.rest.getSuppliers().subscribe((data: {}) => {
      this.suppliers = data;
    });
  }

  get assetsFormData() {
    return <FormArray>this.assetForm.get('items');
  }

  buildItem(uuid: string, name: string, count: number, unit: string, unitPrice: number) {
    return new FormGroup({
      uuid: new FormControl(uuid, Validators.required),
      name: new FormControl(name, Validators.required),
      count: new FormControl(count, Validators.required),
      unit: new FormControl(unit, Validators.required),
      unitPrice: new FormControl(unitPrice, Validators.required),
    });
  }

  mapQuickInvoice(input) {
    return new Invoice(
      input.name,
      input.invoiceNumber,
      input.supplierVariableSymbol,
      input.currency,
      this.mapToCustomer(input),
      input.supplier,
      input.dateOfIssue,
      input.deliveryDate,
      input.dueDate,
      input.payDate,
      input.note,
      this.assetForm.getRawValue().items
    );
  }

  mapToCustomer(data) {
    return new Customer(
      null,
      data.customerName,
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

  onSubmitInvoiceDetailsForm() {
    const invoice = this.invoiceDetailsForm.getRawValue();
    invoice.assets = this.assetForm.getRawValue().items;
    const mappedInvoice = this.mapQuickInvoice(invoice);
    this.rest.saveQuickInvoice( mappedInvoice).subscribe(() => {
      this.router.navigate(['invoices']);
    });
  }
}
