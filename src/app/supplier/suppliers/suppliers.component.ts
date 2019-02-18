import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource, PageEvent, Sort} from '@angular/material';
import {Router} from '@angular/router';
import {RestService} from '../../rest.service';
import {LangService} from 'src/app/lang.service';
import {TranslateService} from '@ngx-translate/core';

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

export class Supplier {
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

const ELEMENT_DATA: Supplier[] = [];


@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {
  displayedColumns: string[] = ['name', 'companyIdentificationNumber', 'taxIdentificationNumber', 'town', 'actions'];
  dataSource = new MatTableDataSource<Supplier>(ELEMENT_DATA);

  suppliers: any = [];
  sure: string;
  defaultPageSize = 10;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private router: Router, private rest: RestService, private translate: TranslateService) {
    translate.setDefaultLang(LangService.getLanguage());
    translate.get('suppliers.sure').subscribe((translated: string) => {
      this.sure = translated;
    });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getSuppliers(this.paginator.pageIndex, this.defaultPageSize);
  }

  onEdit(supplier) {
    this.selectRow(supplier);
  }

  onDelete(supplier) {
    this.removeSupplier(supplier.uuid);
  }

  selectRow(supplier) {
    this.router.navigate(['/suppliers/' + supplier.uuid]);
  }

  newEntry() {
    this.router.navigate(['/suppliers/new-supplier']);
  }

  getSuppliers(pageIndex, pageSize) {
    this.suppliers = [];
    this.rest.getSuppliersWithPagination(pageIndex, pageSize).subscribe(data => {
      this.dataSource = new MatTableDataSource<Supplier>(data.content);
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
    this.getSuppliers(event.pageIndex, event.pageSize);
  }

  removeSupplier(uuid) {
    if (confirm(this.sure)) {
      this.rest.removeSupplier(uuid).subscribe((data: {}) => {
        this.getSuppliers(this.paginator.pageIndex, this.paginator.pageSize);
      });
    }
  }
}
