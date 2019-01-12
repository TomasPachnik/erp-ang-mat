import {Component, ViewChild} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';
import {MatSidenav} from '@angular/material';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  @ViewChild('sidenav') private nav: MatSidenav;

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService) {
  }

  toggleNav() {
    this.nav.toggle();
  }

  hasAdminRole() {
    return this.authService.hasRoleAdmin();
  }

}
