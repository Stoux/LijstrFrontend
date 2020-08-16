import * as Raven from 'raven-js';
import { BrowserModule, Title } from '@angular/platform-browser';
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { NavigationComponent } from './core/navigation/navigation.component';
import { CollapseModule } from 'ngx-bootstrap';
import { TitleService } from './core/services/title.service';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from './core/services/user.service';
import { filter, first } from 'rxjs/operators';


export class RavenErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    Raven.captureException(err.originalError || err);
    console.error(err.originalError || err);
  }
}

// Enable sentry if there's a key available
if (environment.sentryKey != null) {
  Raven.config(environment.sentryKey).install();
}

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    AppRoutingModule,
    CollapseModule.forRoot(),
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: RavenErrorHandler
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [UserService],
      useFactory: (service: UserService) => {
        return () => service.userChangeFeed().pipe(
          filter(user => user !== undefined),
          first(),
        ).toPromise();
      },
    },
    Title, // Required to wrap
    TitleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
