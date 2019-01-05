import {Injectable, Injector} from '@angular/core';
import {Router} from '@angular/router';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';


@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
  constructor(private injector: Injector, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = req;
    if (sessionStorage.getItem('access_token')) {
      // @ts-ignore
      authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('access_token'))
      });
    }
    return next.handle(authReq).pipe(tap(
      (data: any) => {
      }, error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401 || error.status === 403) {
            localStorage.clear();
            this.router.navigate(['/']);
          }
          if (error.status === 404) {
            this.router.navigate(['/404']);
          }
        }
      }
    ));
  }

}


