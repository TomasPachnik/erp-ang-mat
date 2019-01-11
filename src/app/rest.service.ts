import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {map, catchError, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

const endpoint = (() => {
  if (environment.production) {
    return 'https://192.168.2.201:8443/';
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

  getCustomers(): Observable<any> {
    return this.http.get(endpoint() + 'customers/').pipe(
      tap(_ => map(this.extractData)),
      catchError(this.handleError)
    );
  }

  getCustomer(uuid): Observable<any> {
    return this.http.get(endpoint() + 'customers/get/' + uuid).pipe(
      tap(_ => map(this.extractData)),
      catchError(this.handleError)
    );
  }

  updateCustomer(customer): Observable<any> {
    return this.http.post(endpoint() + 'customers/save', JSON.stringify(customer), httpOptions).pipe(
      tap(_ => map(this.extractData)),
      catchError(this.handleError)
    );
  }

  removeCustomer(uuid): Observable<any> {
    return this.http.get(endpoint() + 'customers/remove/' + uuid).pipe(
      tap(_ => map(this.extractData)),
      catchError(this.handleError)
    );
  }

  getSuppliers(): Observable<any> {
    return this.http.get(endpoint() + 'suppliers/').pipe(
      tap(_ => map(this.extractData)),
      catchError(this.handleError)
    );
  }

  getSupplier(uuid): Observable<any> {
    return this.http.get(endpoint() + 'suppliers/get/' + uuid).pipe(
      tap(_ => map(this.extractData)),
      catchError(this.handleError)
    );
  }

  updateSupplier(supplier): Observable<any> {
    return this.http.post(endpoint() + 'suppliers/save', JSON.stringify(supplier), httpOptions).pipe(
      tap(_ => map(this.extractData)),
      catchError(this.handleError)
    );
  }

  removeSupplier(uuid): Observable<any> {
    return this.http.get(endpoint() + 'suppliers/remove/' + uuid).pipe(
      tap(_ => map(this.extractData)),
      catchError(this.handleError)
    );
  }

  getUsers(): Observable<any> {
    return this.http.get(endpoint() + 'users/').pipe(
      tap(_ => map(this.extractData)),
      catchError(this.handleError)
    );
  }

  getUser(uuid): Observable<any> {
    return this.http.get(endpoint() + 'users/get/' + uuid).pipe(
      tap(_ => map(this.extractData)),
      catchError(this.handleError)
    );
  }

  getUserByToken(): Observable<any> {
    return this.http.get(endpoint() + 'users/getByToken').pipe(
      tap(_ => map(this.extractData)),
      catchError(this.handleError)
    );
  }

  updateUser(user): Observable<any> {
    return this.http.post(endpoint() + 'users/save', JSON.stringify(user), httpOptions).pipe(
      tap(_ => map(this.extractData)),
      catchError(this.handleError)
    );
  }

  removeUser(uuid): Observable<any> {
    return this.http.get(endpoint() + 'users/remove/' + uuid).pipe(
      tap(_ => map(this.extractData)),
      catchError(this.handleError)
    );
  }

  updateCurrentUser(user): Observable<any> {
    return this.http.post(endpoint() + 'users/saveCurrent', JSON.stringify(user), httpOptions).pipe(
      tap(_ => map(this.extractData)),
      catchError(this.handleError)
    );
  }

  changePassword(password): Observable<any> {
    return this.http.post(endpoint() + 'users/changePassword', JSON.stringify(password), httpOptions).pipe(
      tap(_ => map(this.extractData)),
      catchError(this.handleError)
    );
  }

  getInvoices(): Observable<any> {
    return this.http.get(endpoint() + 'invoices/').pipe(
      tap(_ => map(this.extractData)),
      catchError(this.handleError)
    );
  }

  getInvoice(uuid): Observable<any> {
    return this.http.get(endpoint() + 'invoices/get/' + uuid).pipe(
      tap(_ => map(this.extractData)),
      catchError(this.handleError)
    );
  }

  removeInvoice(uuid): Observable<any> {
    return this.http.get(endpoint() + 'invoices/remove/' + uuid).pipe(
      tap(_ => map(this.extractData)),
      catchError(this.handleError)
    );
  }


  updateInvoice(invoice): Observable<any> {
    return this.http.post(endpoint() + 'invoices/save', JSON.stringify(invoice), httpOptions).pipe(
      tap(_ => map(this.extractData)),
      catchError(this.handleError)
    );
  }

  generateInvoice(uuid): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.http.get(endpoint() + 'invoices/generate/' + uuid, {headers: headers, responseType: 'blob'});
  }


}
