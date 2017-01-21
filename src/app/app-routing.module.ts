import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./core/home/home.component";
import { NgModule } from "@angular/core";
import { ErrorPageComponent } from "./core/error-page/error-page.component";
import { AdminGuard } from "./core/guards/admin-guard.service";

export const routes : Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'movies',
    loadChildren: 'app/movies/movies.module#MoviesModule'
  },
  {
    path: 'admin',
    loadChildren: 'app/admin/admin.module#AdminModule',
    canLoad: [AdminGuard]
  },
  {
    path: 'dashboard',
    loadChildren: 'app/dashboard/dashboard.module#DashboardModule'
  },
  {
    path: '**',
    component: ErrorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
