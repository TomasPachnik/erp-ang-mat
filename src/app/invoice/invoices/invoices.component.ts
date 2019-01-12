import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {RestService} from '../../rest.service';
import * as FileSaver from 'file-saver';

export class Invoice {
  uuid: string;
  name: string;
  invoiceNumber: string;
  supplier: string;
  customer: string;
  dateOfIssue: Date;
  deliveryDate: Date;
  dueDate: Date;
  price: string;
  issuer: string;
}

const ELEMENT_DATA: Invoice[] = [];

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {

  displayedColumns: string[] = ['name', 'supplier', 'customer', 'dateOfIssue', 'deliveryDate', 'dueDate', 'price', 'actions'];
  dataSource = new MatTableDataSource<Invoice>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private router: Router, private rest: RestService) {
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getInvoices();
  }

  getInvoices() {
    this.rest.getInvoices().subscribe((data: {}) => {
      // @ts-ignore
      this.dataSource = new MatTableDataSource<Invoice>(data);
    });
  }

  getTotalCost() {
    let result = 0;
    for (const entry of this.dataSource.data) {
      // @ts-ignore
      result += entry.total;
    }
    return result;
  }

  getCurrency() {
    if (this.dataSource.data.length > 0) {
      // @ts-ignore
      return this.dataSource.data[0].currency;
    }
    return '';
  }

  onPdf(invoice) {
    this.rest.generateInvoice(invoice.uuid).subscribe((file: Blob) => {
      const filename = invoice.name + '.pdf';
      FileSaver.saveAs(file, filename);
    });
  }

  onEdit(invoice) {
    this.router.navigate(['/invoices/' + invoice.uuid]);
  }

  newEntry() {
    this.router.navigate(['/invoices/new-invoice']);
  }

  onDelete(invoice) {
    if (confirm('Ste si istý?')) {
      this.rest.removeInvoice(invoice.uuid).subscribe((data: {}) => {
        this.getInvoices();
      });
    }
  }
}
