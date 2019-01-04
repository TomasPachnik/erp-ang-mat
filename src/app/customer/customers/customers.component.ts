import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';

export interface Customer {
  uuid: string;
  name: string;
  companyIdentificationNumber: string;
  taxIdentificationNumber: string;
  town: string;
}

const ELEMENT_DATA: Customer[] = [
  {uuid: 'bla_bla', name: 'Hydrogen1', companyIdentificationNumber: '10079', taxIdentificationNumber: 'H', town: 'asd'},
  {uuid: 'bla_bla', name: 'Hydrogen2', companyIdentificationNumber: '10079', taxIdentificationNumber: 'H', town: 'asd'},
  {uuid: 'bla_bla', name: 'Hydrogen3', companyIdentificationNumber: '10079', taxIdentificationNumber: 'H', town: 'asd'},
  {uuid: 'bla_bla', name: 'Hydrogen4', companyIdentificationNumber: '10079', taxIdentificationNumber: 'H', town: 'asd'},
];

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  displayedColumns: string[] = ['name', 'companyIdentificationNumber', 'taxIdentificationNumber', 'town'];
  dataSource = new MatTableDataSource<Customer>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() {
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

}
