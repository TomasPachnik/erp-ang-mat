import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RestService} from '../../rest.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {LangService} from '../../lang.service';

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
    customer: ['', Validators.required],
    supplier: ['', Validators.required],
    dateOfIssue: [new Date(), Validators.required],
    deliveryDate: ['', Validators.required],
    dueDate: ['', Validators.required],
    payDate: [''],
    note: [''],
  });

  assetForm: FormGroup;

  customers: any = [];
  suppliers: any = [];

  constructor(private fb: FormBuilder, private rest: RestService, private router: Router,
              private route: ActivatedRoute, private translate: TranslateService) {
    translate.setDefaultLang(LangService.getLanguage());
  }

  ngOnInit() {
    this.getSuppliers();
    if (this.route.snapshot.params['uuid'] !== 'new-invoice') {
      this.getInvoiceDetail();
    }
    this.assetForm = this.fb.group({
      items: this.fb.array([])
    });
  }

  getSuppliers() {
    this.rest.getSuppliers().subscribe((data: {}) => {
      this.suppliers = data;
    });
  }

  getInvoiceDetail() {
    this.rest.getInvoice(this.route.snapshot.params['uuid']).subscribe((data: {}) => {
      this.mapFromInvoice(data);
    });
  }

  get assetsFormData() {
    return <FormArray>this.assetForm.get('items');
  }

  private mapFromInvoice(data) {
    this.invoiceDetailsForm.controls['uuid'].setValue(data.uuid);
    this.invoiceDetailsForm.controls['name'].setValue(data.name);
    this.invoiceDetailsForm.controls['invoiceNumber'].setValue(data.invoiceNumber);
    this.invoiceDetailsForm.controls['supplierVariableSymbol'].setValue(data.supplierVariableSymbol);
    this.invoiceDetailsForm.controls['currency'].setValue(data.currency);
    this.invoiceDetailsForm.controls['customer'].setValue(data.customer.uuid);
    this.invoiceDetailsForm.controls['supplier'].setValue(data.supplier.uuid);
    this.invoiceDetailsForm.controls['dateOfIssue'].setValue(new Date(data.dateOfIssue));
    this.invoiceDetailsForm.controls['deliveryDate'].setValue(new Date(data.deliveryDate));
    this.invoiceDetailsForm.controls['dueDate'].setValue(new Date(data.dueDate));
    if (data.payDate != null) {
      this.invoiceDetailsForm.controls['payDate'].setValue(new Date(data.payDate));
    }
    this.invoiceDetailsForm.controls['note'].setValue(data.note);
    for (const item of data.assets) {
      // @ts-ignore
      this.assetForm.get('items').push(this.buildItem(item.uuid, item.name, item.count, item.unit, item.unitPrice));
    }
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

  onSubmitInvoiceDetailsForm() {
    const invoice = this.invoiceDetailsForm.getRawValue();
    invoice.assets = this.assetForm.getRawValue().items;
    this.rest.updateInvoice(invoice).subscribe(() => {
      this.router.navigate(['invoices']);
    });
  }
}
