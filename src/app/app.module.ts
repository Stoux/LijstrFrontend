import * as Raven from 'raven-js';
import { BrowserModule, Title } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { NavigationComponent } from './core/navigation/navigation.component';
import { CollapseModule } from 'ngx-bootstrap';
import { TitleService } from './core/services/title.service';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SwiperModule } from 'ngx-swiper-wrapper';


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
    SwiperModule,
  ],
  providers: [
    {provide: ErrorHandler, useClass: RavenErrorHandler},
    Title, // Required to wrap
    TitleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
