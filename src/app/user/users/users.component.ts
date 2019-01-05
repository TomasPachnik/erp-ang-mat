import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {RestService} from '../../rest.service';

export class User {
  uuid: string;
  login: string;
  name: string;
  email: string;
  phone: string;
  enabled: boolean;
}

const ELEMENT_DATA: User[] = [];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['username', 'name', 'email', 'phone', 'active', 'actions'];
  dataSource = new MatTableDataSource<User>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private router: Router, private rest: RestService) {
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getUsers();
  }

  getUsers() {
    this.rest.getUsers().subscribe((data: {}) => {
      // @ts-ignore
      this.dataSource = new MatTableDataSource<User>(data);
    });
  }

}
