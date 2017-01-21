import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from "@angular/http";
import { HomeComponent } from "./home/home.component";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { RouterModule } from "@angular/router";

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
  ]
})
export class CoreModule {

  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

}
