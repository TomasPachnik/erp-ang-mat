import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource, PageEvent, Sort} from '@angular/material';
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
  defaultPageSize = 10;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  sure: string;
  constructor(private router: Router, private rest: RestService) {
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getUsers(this.paginator.pageIndex, this.defaultPageSize);
  }

  getUsers(pageIndex, pageSize) {
    this.rest.getUsersWithPagination(pageIndex, pageSize).subscribe(data => {
      this.dataSource = new MatTableDataSource<User>(data.content);
      this.paginator.pageIndex = data.pageable.pageIndex;
      this.paginator.pageSize = data.pageable.pageSize;
      this.paginator.length = data.total;
    });
  }

  newEntry() {
    this.router.navigate(['/users/new-user']);
  }

  // TODO implement this function
  sortData(sort: Sort) {
    console.log(sort);

  }


  onEdit(user) {
    this.router.navigate(['/users/' + user.uuid]);
  }

  handlePage(event: PageEvent) {
    this.getUsers(event.pageIndex, event.pageSize);
  }

  onDelete(user) {
    if (confirm('Ste si istý?')) {
      this.rest.removeUser(user.uuid).subscribe(() => {
        this.getUsers(this.paginator.pageIndex, this.paginator.pageSize);
      });
    }
  }

}
