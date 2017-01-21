import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { NgModule } from "@angular/core";
import { ErrorPageComponent } from "./error-page/error-page.component";

export const routes : Routes = [
  {path: '', component: HomeComponent},
  {path: '**', component: ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
