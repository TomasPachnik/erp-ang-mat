import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthGuard} from './auth/auth.guard';
import {AuthService} from './auth/auth.service';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavComponent} from './nav/nav.component';
import {LayoutModule} from '@angular/cdk/layout';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
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
  MatTooltipModule
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
import { SupplierDetailComponent } from './supplier/supplier-detail/supplier-detail.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomePageComponent}
];

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
    SupplierDetailComponent
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
    HttpClientModule
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
    MatTooltipModule
  ],
  providers: [AuthService, AuthGuard, RestService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyHttpInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
