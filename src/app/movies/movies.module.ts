import { NgModule } from "@angular/core";
import { MovieListComponent } from "./movie-list/movie-list.component";
import { MovieStatsComponent } from "./movie-stats/movie-stats.component";
import { MovieSelectComponent } from "./movie-select/movie-select.component";
import { MovieDetailComponent } from "./movie-detail/movie-detail.component";
import { MoviesRoutingModule } from "./movies-routing.module";
import { MovieListService } from "./services/movie-list.service";
import { SharedModule } from "../shared/shared.module";
import { MoviesComponent } from "./movies.component";
import { MovieDetailService } from "./services/movie-detail.service";

@NgModule({
  imports: [
    SharedModule,
    MoviesRoutingModule
  ],
  declarations: [
    MoviesComponent,
    MovieListComponent,
    MovieStatsComponent,
    MovieSelectComponent,
    MovieDetailComponent
  ],
  providers: [
    MovieListService,
    MovieDetailService
  ]
})
export class MoviesModule {
}
