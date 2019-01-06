import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {RestService} from '../../rest.service';
import * as FileSaver from 'file-saver';

export class Invoice {
  uuid: string;
  name: string;
  invoiceNumber: string;
  customer: Date;
  dateOfIssue: Date;
  dueDate: string;
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

  displayedColumns: string[] = ['name', 'number', 'customer', 'dateOfIssue', 'dueDate', 'price', 'issuer', 'actions'];
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
      console.log(data);
      // @ts-ignore
      this.dataSource = new MatTableDataSource<Invoice>(data);
    });
  }

  onPdf(invoice) {
    this.rest.generateInvoice(invoice.uuid).subscribe((file: Blob) => {
      const filename = invoice.name + '.pdf';
      FileSaver.saveAs(file, filename);
    });
  }
}
