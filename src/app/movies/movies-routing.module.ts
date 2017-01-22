import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MovieStatsComponent } from "./movie-stats/movie-stats.component";
import { MovieListComponent } from "./movie-list/movie-list.component";
import { MovieSelectComponent } from "./movie-select/movie-select.component";
import { MovieDetailComponent } from "./movie-detail/movie-detail.component";
import { MoviesComponent } from "./movies.component";
import { MovieDetailResolver } from "./movie-detail/movie-detail-resolver.service";

const routes : Routes = [
  {
    path: '',
    component: MoviesComponent,
    children: [
      {
        path: 'stats',
        component: MovieStatsComponent
      },
      {
        path: '',
        component: MovieListComponent,
        children: [
          {
            path: ':id',
            component: MovieDetailComponent,
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
