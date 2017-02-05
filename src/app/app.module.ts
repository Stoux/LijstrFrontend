import { BrowserModule, Title } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { CoreModule } from "./core/core.module";
import { NavigationComponent } from "./core/navigation/navigation.component";
import { CollapseModule } from "ng2-bootstrap";
import { TitleService } from "./core/services/title.service";

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
    TitleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
