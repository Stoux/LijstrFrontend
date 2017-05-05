import * as Raven from "raven-js";
import { BrowserModule, Title } from "@angular/platform-browser";
import { ErrorHandler, NgModule, Provider } from "@angular/core";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { CoreModule } from "./core/core.module";
import { NavigationComponent } from "./core/navigation/navigation.component";
import { CollapseModule } from "ngx-bootstrap";
import { TitleService } from "./core/services/title.service";
import { environment } from "../environments/environment";

export class RavenErrorHandler implements ErrorHandler {
  handleError(err : any) : void {
    Raven.captureException(err.originalError || err);
  }
}

//Enable sentry if there's a key available
let errorProvider : Provider[] = [];
if (environment.sentryKey != null) {
  Raven.config(environment.sentryKey).install();
  errorProvider.push({provide: ErrorHandler, useClass: RavenErrorHandler})
}

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    CollapseModule.forRoot()
  ],
  providers: errorProvider.concat([
    Title, //Required to wrap
    TitleService
  ]),
  bootstrap: [AppComponent]
})
export class AppModule {
}
