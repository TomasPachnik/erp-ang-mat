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

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', component: HomePageComponent},
      {path: 'user/settings', component: UserSettingsComponent},
      {path: 'customers', component: CustomersComponent},
      {path: 'suppliers', component: SuppliersComponent},
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
