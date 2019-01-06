import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {RestService} from '../../rest.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css']
})
export class InvoiceDetailComponent implements OnInit {

  invoiceDetailsForm = this.fb.group({
    uuid: [null],
    name: ['', Validators.required],
    invoiceNumber: ['', Validators.required],
    supplierVariableSymbol: ['', Validators.required],
    currency: ['', Validators.required],
    customer: ['', Validators.required],
    supplier: ['', Validators.required],
    dateOfIssue: ['', Validators.required],
    deliveryDate: ['', Validators.required],
    dueDate: ['', Validators.required],
    note: ['', Validators.required]
  });

  customers: any = [];
  suppliers: any = [];

  constructor(private fb: FormBuilder, private rest: RestService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getCustomers();
    this.getSuppliers();
    if (this.route.snapshot.params['uuid'] !== 'new-invoice') {
      this.getInvoiceDetail();
    }
  }

  getCustomers() {
    this.rest.getCustomers().subscribe((invoices: {}) => {
      this.customers = invoices;
    });
  }

  getSuppliers() {
    this.rest.getSuppliers().subscribe((data: {}) => {
      this.suppliers = data;
    });
  }

  getInvoiceDetail() {
    this.rest.getInvoice(this.route.snapshot.params['uuid']).subscribe((data: {}) => {
      console.log(data);
      this.mapFromInvoice(data);
    });
  }

  private mapFromInvoice(data) {
    this.invoiceDetailsForm.controls['uuid'].setValue(data.uuid);
    this.invoiceDetailsForm.controls['name'].setValue(data.name);
    this.invoiceDetailsForm.controls['invoiceNumber'].setValue(data.invoiceNumber);
    this.invoiceDetailsForm.controls['supplierVariableSymbol'].setValue(data.supplierVariableSymbol);
    this.invoiceDetailsForm.controls['currency'].setValue(data.currency);
    this.invoiceDetailsForm.controls['customer'].setValue(data.customer.uuid);
    this.invoiceDetailsForm.controls['supplier'].setValue(data.supplier.uuid);
    this.invoiceDetailsForm.controls['dateOfIssue'].setValue(data.dateOfIssue);
    this.invoiceDetailsForm.controls['deliveryDate'].setValue(data.deliveryDate);
    this.invoiceDetailsForm.controls['dueDate'].setValue(data.dueDate);
    this.invoiceDetailsForm.controls['note'].setValue(data.note);
  }

  onSubmitInvoiceDetailsForm(invoice) {
    console.log(invoice);
  }
}
