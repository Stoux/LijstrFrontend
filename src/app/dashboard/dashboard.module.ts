import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard.component";
import { LoginComponent } from "./login/login.component";
import { LogoutComponent } from "./logout/logout.component";
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  imports: [
    SharedModule,
    DashboardRoutingModule
  ],
  declarations: [
    DashboardComponent,
    LoginComponent,
    LogoutComponent,
    ResetPasswordComponent
  ]
})
export class DashboardModule {
}
