import { NgModule, SkipSelf, Optional } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpModule } from "@angular/http";
import { HomeComponent } from "./home/home.component";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { UserService } from "./services/user.service";
import { AuthService } from "./services/auth.service";
import { ApiService } from "./services/api.service";
import { AdminGuard } from "./guards/admin-guard.service";
import { UserGuard } from "./guards/user-guard.service";
import { RedirectService } from "./services/redirect.service";
import { LoginService } from "./services/login.service";

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: [
    ErrorPageComponent,
    HomeComponent
  ],
  exports: [
    HttpModule
  ],
  providers: [
    //Guards
    AdminGuard,
    UserGuard,

    //Services
    ApiService,
    AuthService,
    UserService,
    LoginService,
    RedirectService
  ]
})
export class CoreModule {

  //Inject UserService to force creation
  constructor(@Optional() @SkipSelf() parentModule : CoreModule, userService : UserService) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

}
