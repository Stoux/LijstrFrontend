import { NgModule, SkipSelf, Optional } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpModule } from "@angular/http";
import { HomeComponent } from "./home/home.component";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { RouterModule } from "@angular/router";
import { UserService } from "./services/user.service";
import { AuthService } from "./services/auth.service";
import { ApiService } from "./services/api.service";
import { AdminGuard } from "./guards/admin-guard.service";

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule
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

    //Services
    ApiService,
    AuthService,
    UserService
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
