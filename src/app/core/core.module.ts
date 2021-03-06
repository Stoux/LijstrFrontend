import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { ApiService } from './services/api.service';
import { AdminGuard } from './guards/admin-guard.service';
import { UserGuard } from './guards/user-guard.service';
import { RedirectService } from './services/redirect.service';
import { LoginService } from './services/login.service';
import { RouterModule } from '@angular/router';
import { MovieOutstandingService } from './services/section/movie-outstanding.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  declarations: [
    ErrorPageComponent,
    HomeComponent,
  ],
  exports: [
    HttpClientModule,
  ],
  providers: [
    // Guards
    AdminGuard,
    UserGuard,

    // Services
    ApiService,
    AuthService,
    UserService,
    LoginService,
    RedirectService,
    MovieOutstandingService
  ]
})
export class CoreModule {

  // Inject UserService to force creation
  constructor(@Optional() @SkipSelf() parentModule: CoreModule, userService: UserService) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

}
