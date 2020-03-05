import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { UserGuard } from '../core/guards/user-guard.service';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [UserGuard],
    data: {title: 'Dashboard'}
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {title: 'Login'}
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [UserGuard],
    data: {title: 'Loguit'}
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    data: {title: 'Wachtwoord resetten'}
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    data: {title: 'Wachtwoord vergeten..'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
