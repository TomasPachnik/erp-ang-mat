import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {map, catchError, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

const endpoint = (() => {
  if (environment.production) {
    return 'http://ec2-3-16-158-12.us-east-2.compute.amazonaws.com:5554/';
  } else {
    return 'https://localhost:8443/';
  }
});

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RestService {

  private extractData(res: Response) {
    return res || {};
  }

  private handleError(error) {
    return throwError(error);
  }

  constructor(private http: HttpClient) {
  }

  signIn(credentials): Observable<any> {
    return this.http.post(endpoint() + 'auth/signin', JSON.stringify(credentials), httpOptions).pipe(
      tap(_ => map(this.extractData)),
      catchError(this.handleError)
    );
  }

}
