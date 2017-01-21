import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MovieStatsComponent } from "./movie-stats/movie-stats.component";
import { MovieListComponent } from "./movie-list/movie-list.component";
import { MovieSelectComponent } from "./movie-select/movie-select.component";
import { MovieDetailComponent } from "./movie-detail/movie-detail.component";

const routes : Routes = [
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
        component: MovieDetailComponent
      },
      {
        path: '',
        component: MovieSelectComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule {
}
