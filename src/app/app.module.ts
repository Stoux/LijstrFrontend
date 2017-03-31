import * as Raven from "raven-js";
import { BrowserModule, Title } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { CoreModule } from "./core/core.module";
import { NavigationComponent } from "./core/navigation/navigation.component";
import { CollapseModule } from "ng2-bootstrap";
import { TitleService } from "./core/services/title.service";
import { environment } from "../environments/environment";

Raven.config(environment.sentryKey).install();

export class RavenErrorHandler implements ErrorHandler {
  handleError(err : any) : void {
    Raven.captureException(err.originalError || err);
  }
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
  providers: [
    Title, //Required to wrap
    TitleService,
    {provide: ErrorHandler, useClass: RavenErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
