import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MovieStatsComponent } from "./movie-stats/movie-stats.component";
import { MovieListComponent } from "./movie-list/movie-list.component";
import { MovieSelectComponent } from "./movie-list/movie-select/movie-select.component";
import { MovieDetailComponent } from "./movie-detail/movie-detail.component";
import { MoviesComponent } from "./movies.component";
import { MovieDetailResolver } from "./movie-detail/movie-detail-resolver.service";
import { MovieRequestComponent } from "./movie-request/movie-request.component";
import { MovieUserGuard } from "./services/guards/movie-user-guard.service";
import { UserGuard } from "../core/guards/user-guard.service";
import { MovieOutstandingComponent } from "./movie-outstanding/movie-outstanding.component";

const routes : Routes = [
  {
    path: 'add',
    component: MovieRequestComponent,
    data: {title: 'Film toevoegen'},
    canActivate: [UserGuard, MovieUserGuard]
  },
  {
    path: 'outstanding',
    component: MovieOutstandingComponent,
    data: {title: 'Nog niet ingevuld'},
    canActivate: [UserGuard]
  },
  {
    path: '',
    component: MoviesComponent,
    children: [
      {
        path: 'stats',
        component: MovieStatsComponent,
        data: {title: 'Filmstats'}
      },
      {
        path: '',
        component: MovieListComponent,
        data: {title: 'Films'},
        children: [
          {
            path: ':id',
            component: MovieDetailComponent,
            data: {resolveTitle: 'movieDetail.title'},
            resolve: {
              movieDetail: MovieDetailResolver
            }
          },
          {
            path: '',
            component: MovieSelectComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    MovieDetailResolver
  ]
})
export class MoviesRoutingModule {
}
