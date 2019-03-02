import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthGuard} from './auth/auth.guard';
import {AdminGuard} from './auth/admin.guard';
import {AuthService} from './auth/auth.service';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavComponent} from './nav/nav.component';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {LayoutModule} from '@angular/cdk/layout';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatListModule,
  MatTabsModule,
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatSnackBarModule,
  MatCheckboxModule,
  MatSelectModule,
  MatTooltipModule,
  MatDatepickerModule, MatNativeDateModule, NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS,
} from '@angular/material';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {HeaderComponent} from './header/header.component';
import {LoginComponent} from './login/login.component';
import {HomeLayoutComponent} from './layouts/home-layout/home-layout.component';
import {LoginLayoutComponent} from './layouts/login-layout/login-layout.component';
import {UserSettingsComponent} from './user/user-settings/user-settings.component';
import {CustomersComponent} from './customer/customers/customers.component';
import {SuppliersComponent} from './supplier/suppliers/suppliers.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {CustomerDetailComponent} from './customer/customer-detail/customer-detail.component';
import {RestService} from './rest.service';
import {MyHttpInterceptor} from './auth/http.interceptor';
import {SupplierDetailComponent} from './supplier/supplier-detail/supplier-detail.component';
import {UsersComponent} from './user/users/users.component';
import {UserDetailComponent} from './user/user-detail/user-detail.component';
import {InvoicesComponent} from './invoice/invoices/invoices.component';
import {InvoiceDetailComponent} from './invoice/invoice-detail/invoice-detail.component';
import {NgHttpLoaderModule} from 'ng-http-loader';
import {MatProgressButtonsModule} from 'mat-progress-buttons';
import {ToDoComponent} from './to-do/to-do.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { AuditSettingsComponent } from './audit/audit-settings/audit-settings.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomePageComponent}
];

const MY_DATE_FORMATS = {
  parse: {
    dateInput: {month: 'short', year: 'numeric', day: 'numeric'}
  },
  display: {
    dateInput: 'input',
    monthYearLabel: {year: 'numeric', month: 'short'},
    dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
    monthYearA11yLabel: {year: 'numeric', month: 'long'},
  }
};

export class MyDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return this._to2digit(day) + '.' + this._to2digit(month) + '.' + year;
    } else {
      return date.toDateString();
    }
  }

  private _to2digit(n: number) {
    return ('00' + n).slice(-2);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomePageComponent,
    NavComponent,
    HeaderComponent,
    LoginComponent,
    HomeLayoutComponent,
    LoginLayoutComponent,
    UserSettingsComponent,
    CustomersComponent,
    SuppliersComponent,
    NotFoundComponent,
    CustomerDetailComponent,
    SupplierDetailComponent,
    UsersComponent,
    UserDetailComponent,
    InvoicesComponent,
    InvoiceDetailComponent,
    ToDoComponent,
    AuditSettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatTabsModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    RouterModule.forRoot(appRoutes),
    MatSortModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTooltipModule,
    HttpClientModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DragDropModule,
    NgHttpLoaderModule.forRoot(),
    MatProgressButtonsModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    MatToolbarModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTooltipModule,
    FormsModule,
    MatDatepickerModule,
    DragDropModule
  ],
  providers: [AuthService, AuthGuard, AdminGuard, RestService, MatDatepickerModule,
    {provide: DateAdapter, useClass: MyDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyHttpInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
