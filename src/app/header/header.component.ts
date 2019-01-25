import {Component, ViewChild} from '@angular/core';
import {AuthService} from './../auth/auth.service';
import {Router} from '@angular/router';
import {NavComponent} from '../nav/nav.component';
import {LangService} from '../lang.service';
import {TranslateService} from '@ngx-translate/core';

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
  name = '';
  navComponent: NavComponent;

  constructor(private authService: AuthService, private router: Router, private nav: NavComponent, private translate: TranslateService) {
    translate.setDefaultLang(LangService.getLanguage());
    this.name = authService.getName();
    this.navComponent = nav;
  }

  toggleNav() {
    this.navComponent.toggleNav();
  }


  userSettings() {
    this.router.navigate(['/user/settings']);
  }

  onLogout() {
    this.authService.logout();
  }
}
