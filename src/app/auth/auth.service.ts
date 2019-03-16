import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {User} from './user';
import {RestService} from '../rest.service';

const decoder = new JwtHelperService();

@Injectable()
export class AuthService {

  constructor(private router: Router, private rest: RestService) {
  }

  hasRoleAdmin() {
    if (this.isLoggedIn()) {
      const access_token = sessionStorage.getItem('access_token');
      const tokenPayload = decoder.decodeToken(access_token);
      return tokenPayload.roles.indexOf('ROLE_ADMIN') > -1;
    }
  }

  isLoggedIn() {
    const token = sessionStorage.getItem('access_token');
    if (token !== null) {
      return !decoder.isTokenExpired(token);

    }
    return false;
  }

  getName() {
    const access_token = sessionStorage.getItem('access_token');
    return decoder.decodeToken(access_token).name;
  }

  login(user: User): Promise<any> {
    if (user.username !== '' && user.password !== '') {
      return new Promise((resolve, reject) => {
        this.rest.signIn(user).subscribe((data) => {
            // @ts-ignore
            sessionStorage.setItem('access_token', data.token);
            this.router.navigate(['/invoices']);
            resolve(true);
          },
          error => {
            console.log(error);
            this.logout();
            resolve(false);
          });
      });
    }
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
