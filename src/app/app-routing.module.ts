import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './auth/auth.guard';
import {LoginComponent} from './login/login.component';
import {LoginLayoutComponent} from './layouts/login-layout/login-layout.component';
import {HomePageComponent} from './home-page/home-page.component';
import {HomeLayoutComponent} from './layouts/home-layout/home-layout.component';
import {UserSettingsComponent} from './user/user-settings/user-settings.component';
import {CustomersComponent} from './customer/customers/customers.component';
import {SuppliersComponent} from './supplier/suppliers/suppliers.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {CustomerDetailComponent} from './customer/customer-detail/customer-detail.component';
import {SupplierDetailComponent} from './supplier/supplier-detail/supplier-detail.component';
import {UsersComponent} from './user/users/users.component';
import {UserDetailComponent} from './user/user-detail/user-detail.component';
import {AdminGuard} from './auth/admin.guard';
import {InvoicesComponent} from './invoice/invoices/invoices.component';
import {InvoiceDetailComponent} from './invoice/invoice-detail/invoice-detail.component';
import {ToDoComponent} from './to-do/to-do.component';
import {ChatComponent} from './chat/chat/chat.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', component: HomePageComponent},
      {path: 'user/settings', component: UserSettingsComponent},
      {path: 'customers', component: CustomersComponent},
      {path: 'customers/:uuid', component: CustomerDetailComponent},
      {path: 'customers/new-customer', component: CustomerDetailComponent},
      {path: 'suppliers', component: SuppliersComponent},
      {path: 'suppliers/:uuid', component: SupplierDetailComponent},
      {path: 'suppliers/new-supplier', component: SupplierDetailComponent},
      {path: 'invoices', component: InvoicesComponent},
      {path: 'invoices/:uuid', component: InvoiceDetailComponent},
      {path: 'invoices/new-invoice', component: InvoiceDetailComponent},
      {path: 'to-do', component: ToDoComponent},
      {path: 'chat', component: ChatComponent},
      {path: '404', component: NotFoundComponent}
    ]
  },
  {
    path: '',
    component: HomeLayoutComponent,
    canActivate: [AdminGuard],
    children: [
      {path: 'users', component: UsersComponent},
      {path: 'users/:uuid', component: UserDetailComponent},
      {path: 'users/new-user', component: UserDetailComponent},
      {path: '404', component: NotFoundComponent}
    ]
  },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {path: 'login', component: LoginComponent}
    ]
  },
  {path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
