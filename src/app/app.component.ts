import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  constructor(public http: HttpClient) {
  }

  ping() {
    this.http
      .get('http://example.com/api/things')
      .subscribe(data => console.log(data), err => console.log(err));
  }
}
