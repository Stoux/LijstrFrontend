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
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ModalModule } from "ng2-bootstrap";
import { ListSettingsComponent } from './movie-list/list-settings/list-settings.component';
import { MovieUsersService } from "./services/movie-users.service";
import { MovieRatingComponent } from './movie-detail/movie-rating/movie-rating.component';
import { MovieRatingsComponent } from './movie-detail/movie-ratings/movie-ratings.component';

@NgModule({
  imports: [
    SharedModule,
    MoviesRoutingModule,
    NgxDatatableModule,
    ModalModule.forRoot()
  ],
  declarations: [
    MoviesComponent,
    MovieListComponent,
    MovieStatsComponent,
    MovieSelectComponent,
    MovieDetailComponent,
    ListSettingsComponent,
    MovieRatingComponent,
    MovieRatingsComponent
  ],
  providers: [
    MovieUsersService,
    MovieListService,
    MovieDetailService
  ]
})
export class MoviesModule {
}
