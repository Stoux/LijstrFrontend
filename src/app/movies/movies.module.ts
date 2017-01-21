import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MovieListComponent } from "./movie-list/movie-list.component";
import { MovieStatsComponent } from "./movie-stats/movie-stats.component";
import { MovieSelectComponent } from "./movie-select/movie-select.component";
import { MovieDetailComponent } from "./movie-detail/movie-detail.component";
import { MoviesRoutingModule } from "./movies-routing.module";

@NgModule({
  imports: [
    CommonModule,
    MoviesRoutingModule
  ],
  declarations: [
    MovieListComponent,
    MovieStatsComponent,
    MovieSelectComponent,
    MovieDetailComponent
  ]
})
export class MoviesModule {
}
