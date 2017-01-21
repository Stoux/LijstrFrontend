import { NgModule, SkipSelf, Optional } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpModule } from "@angular/http";
import { HomeComponent } from "./home/home.component";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { RouterModule } from "@angular/router";
import { UserService } from "./users/user.service";
import { AuthService } from "./users/auth.service";
import { ApiService } from "./api.service";

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
