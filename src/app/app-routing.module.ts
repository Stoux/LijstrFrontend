import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { NgModule } from '@angular/core';
import { ErrorPageComponent } from './core/error-page/error-page.component';
import { AdminGuard } from './core/guards/admin-guard.service';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {title: 'Home'}
  },
  {
    path: 'movies',
    loadChildren: () => import('./movies/movies.module').then(m => m.MoviesModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AdminGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: '**',
    component: ErrorPageComponent,
    data: {title: 'RIP'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
