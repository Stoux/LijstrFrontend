import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { EmailSettingsComponent } from './email-settings/email-settings.component';
import { EmailSettingsService } from './services/email-settings.service';
import { MovieUserGuard } from '../movies/services/guards/movie-user-guard.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule,
    DashboardRoutingModule
  ],
  declarations: [
    DashboardComponent,
    LoginComponent,
    LogoutComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    EmailSettingsComponent,
  ],
  providers: [
    MovieUserGuard,
    EmailSettingsService,
  ]
})
export class DashboardModule {
}
