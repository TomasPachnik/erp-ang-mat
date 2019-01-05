import {Component} from '@angular/core';
import {AuthService} from './../auth/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
    `.angular-logo {
        margin: 0 4px 3px 0;
        height: 35px;
        vertical-align: middle;
    }
    `
  ]
})
export class HeaderComponent {

  constructor(private authService: AuthService, private router: Router) {
  }

  userSettings() {
    this.router.navigate(['/user/settings']);
  }

  onLogout() {
    this.authService.logout();
  }
}
