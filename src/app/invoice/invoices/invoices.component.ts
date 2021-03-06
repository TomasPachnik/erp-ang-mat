import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource, PageEvent, Sort} from '@angular/material';
import {Router} from '@angular/router';
import {RestService} from '../../rest.service';
import * as FileSaver from 'file-saver';
import {TranslateService} from '@ngx-translate/core';
import {LangService} from '../../lang.service';

export class Invoice {
  uuid: string;
  name: string;
  invoiceNumber: string;
  supplier: string;
  customer: string;
  dateOfIssue: Date;
  deliveryDate: Date;
  dueDate: Date;
  payDate: Date;
  price: string;
  issuer: string;
}

export class Last12Months {
  from: Date;
  amount: number;
  invoiceCount: number;
}

const ELEMENT_DATA: Invoice[] = [];

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {

  displayedColumns: string[] = ['name', 'supplier', 'customer', 'dateOfIssue', 'deliveryDate', 'dueDate', 'payDate', 'price', 'actions'];
  dataSource = new MatTableDataSource<Invoice>(ELEMENT_DATA);
  defaultPageSize = 10;
  last12Months = new Last12Months();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  sure: string;

  constructor(private router: Router, private rest: RestService, private translate: TranslateService) {
    translate.setDefaultLang(LangService.getLanguage());
    translate.get('customers.sure').subscribe((translated: string) => {
      this.sure = translated;
    });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getInvoices(this.paginator.pageIndex, this.defaultPageSize);
    this.getLast12Months();
  }


  getTotalCost() {
    let result = 0;
    for (const entry of this.dataSource.data) {
      // @ts-ignore
      result += entry.total;
    }
    return result;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // TODO implement this function
  sortData(sort: Sort) {
    console.log(sort);

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

  getLast12Months() {
    this.rest.getLast12Months().subscribe(data => {
      this.last12Months = data;
    });
  }

  onEdit(invoice) {
    this.router.navigate(['/invoices/' + invoice.uuid]);
  }

  newEntry() {
    this.router.navigate(['/invoices/new-invoice']);
  }

  newQuickEntry() {
    this.router.navigate(['/new-quick-invoice']);
  }

  onDelete(invoice) {
    if (confirm(this.sure)) {
      this.rest.removeInvoice(invoice.uuid).subscribe(() => {
        this.getInvoices(this.paginator.pageIndex, this.paginator.pageSize);
      });
    }
  }

  handlePage(event: PageEvent) {
    this.getInvoices(event.pageIndex, event.pageSize);
  }

  getInvoices(pageIndex, pageSize) {
    this.rest.getInvoicesWithPagination(pageIndex, pageSize).subscribe(data => {
      this.dataSource = new MatTableDataSource<Invoice>(data.content);
      this.paginator.pageIndex = data.pageable.pageIndex;
      this.paginator.pageSize = data.pageable.pageSize;
      this.paginator.length = data.total;
    });
  }

}
