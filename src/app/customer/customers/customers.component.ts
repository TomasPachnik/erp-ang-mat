import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource, PageEvent, Sort} from '@angular/material';
import {Router} from '@angular/router';
import {RestService} from '../../rest.service';
import {TranslateService} from '@ngx-translate/core';
import {LangService} from '../../lang.service';

export class Address {
  uuid: string;
  street: string;
  houseNumber: string;
  postalCode: string;
  town: string;
  country: string;

  constructor(uuid: string, street: string, houseNumber: string, postalCode: string, town: string, country: string) {
    this.uuid = uuid;
    this.street = street;
    this.houseNumber = houseNumber;
    this.postalCode = postalCode;
    this.town = town;
    this.country = country;
  }
}

export class BankAccount {
  uuid: string;
  bankName: string;
  iban: string;

  constructor(uuid: string, bankName: string, iban: string) {
    this.uuid = uuid;
    this.bankName = bankName;
    this.iban = iban;
  }
}

export class Customer {
  uuid: string;
  name: string;
  companyIdentificationNumber: string;
  taxIdentificationNumber: string;
  address: Address;
  bankAccount: BankAccount;

  constructor(uuid: string, name: string, companyIdentificationNumber: string, taxIdentificationNumber: string,
              addressUuid: string, street: string, houseNumber: string, postalCode: string, town: string, country: string,
              bankAccountUuid: string, bankName: string, iban: string) {
    this.uuid = uuid;
    this.name = name;
    this.companyIdentificationNumber = companyIdentificationNumber;
    this.taxIdentificationNumber = taxIdentificationNumber;
    this.address = new Address(addressUuid, street, houseNumber, postalCode, town, country);
    this.bankAccount = new BankAccount(bankAccountUuid, bankName, iban);
  }
}

const ELEMENT_DATA: Customer[] = [];

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  displayedColumns: string[] = ['name', 'companyIdentificationNumber', 'taxIdentificationNumber', 'town', 'actions'];
  dataSource = new MatTableDataSource<Customer>(ELEMENT_DATA);

  customers: any = [];
  sure: string;
  defaultPageSize = 10;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private router: Router, private rest: RestService, private translate: TranslateService) {
    translate.setDefaultLang(LangService.getLanguage());
    translate.get('customers.sure').subscribe((translated: string) => {
      this.sure = translated;
    });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getCustomers(this.paginator.pageIndex, this.defaultPageSize);
  }

  onEdit(customer) {
    this.selectRow(customer);
  }

  onDelete(customer) {
    this.removeCustomer(customer.uuid);
  }

  selectRow(customer) {
    this.router.navigate(['/customers/' + customer.uuid]);
  }

  newEntry() {
    this.router.navigate(['/customers/new-customer']);
  }

  getCustomers(pageIndex, pageSize) {
    this.customers = [];
    this.rest.getCustomersWithPagination(pageIndex, pageSize).subscribe(data => {
      this.dataSource = new MatTableDataSource<Customer>(data.content);
      this.paginator.pageIndex = data.pageable.pageIndex;
      this.paginator.pageSize = data.pageable.pageSize;
      this.paginator.length = data.total;
    });
  }

  // TODO implement this function
  sortData(sort: Sort) {
    console.log(sort);

  }

  handlePage(event: PageEvent) {
    this.getCustomers(event.pageIndex, event.pageSize);
  }

  removeCustomer(uuid) {
    if (confirm(this.sure)) {
      this.rest.removeCustomer(uuid).subscribe((data: {}) => {
        this.getCustomers(this.paginator.pageIndex, this.paginator.pageSize);
      });
    }
  }
}
