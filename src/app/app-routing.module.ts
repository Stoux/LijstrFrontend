import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./core/home/home.component";
import { NgModule } from "@angular/core";
import { ErrorPageComponent } from "./core/error-page/error-page.component";

export const routes : Routes = [
  {path: '', component: HomeComponent},
  {path: 'movies', loadChildren: 'app/movies/movies.module#MoviesModule'},
  {path: '**', component: ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
