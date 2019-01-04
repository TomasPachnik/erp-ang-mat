import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {User} from './user';

@Injectable()
export class AuthService {

  isLoggedIn() {
    return sessionStorage.getItem('token') !== null;
  }

  constructor(private router: Router) {
  }

  login(user: User) {
    if (user.userName !== '' && user.password !== '') {
      sessionStorage.setItem('token', 'value');
      this.router.navigate(['/']);
    }
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
