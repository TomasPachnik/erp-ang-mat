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

  isLoggedIn() {
    const token = sessionStorage.getItem('access_token');
    if (token !== null) {
      return !decoder.isTokenExpired(token);

    }
    return false;
  }

  getUsername() {
    const access_token = sessionStorage.getItem('access_token');
    return decoder.decodeToken(access_token).sub;
  }

  login(user: User) {
    if (user.username !== '' && user.password !== '') {
      return this.rest.signIn(user).subscribe((data: {}) => {
          sessionStorage.setItem('access_token', data.token);
          this.getUsername();
          this.router.navigate(['/']);
        },
        error => {
          console.log(error);
        });
    }
  }

  logout() {
    sessionStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }
}
