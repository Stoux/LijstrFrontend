import { NgModule } from '@angular/core';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieStatsComponent } from './movie-stats/movie-stats.component';
import { MovieSelectComponent } from './movie-select/movie-select.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { MovieListService } from './services/movie-list.service';
import { SharedModule } from '../shared/shared.module';
import { MoviesComponent } from './movies.component';
import { MovieDetailService } from './services/movie-detail.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'ngx-bootstrap';
import { ListSettingsComponent } from './movie-list/list-settings/list-settings.component';
import { MovieUsersService } from './services/movie-users.service';
import { MovieRatingComponent } from './movie-detail/movie-rating/movie-rating.component';
import { MovieRatingsComponent } from './movie-detail/movie-ratings/movie-ratings.component';
import { MovieRatingsService } from './services/movie-ratings.service';
import { MovieRequestComponent } from './movie-request/movie-request.component';
import { MovieUserGuard } from './services/guards/movie-user-guard.service';
import { MovieRequestService } from './services/movie-request.service';
import { MovieRequestListComponent } from './movie-request/movie-request-list/movie-request-list.component';
import { MovieTimelineComponent } from './movie-detail/movie-timeline/movie-timeline.component';
import { MovieOutstandingComponent } from './movie-outstanding/movie-outstanding.component';
import { MovieDetailTableComponent } from './movie-detail/movie-detail-table/movie-detail-table.component';
import { MovieDetailSummaryComponent } from './movie-detail/movie-detail-summary/movie-detail-summary.component';
import { OldSiteService } from './movie-outstanding/old-site.service';
import { MovieDetailPosterComponent } from './movie-detail/movie-detail-poster/movie-detail-poster.component';
import { MovieWatchlistIconComponent } from './movie-detail/movie-watchlist-icon/movie-watchlist-icon.component';
import { MovieRequestModComponent } from './movie-request/movie-request-mod/movie-request-mod.component';
import { MovieRequestUserComponent } from './movie-request/movie-request-user/movie-request-user.component';
import { MovieTimelineRatingComponent } from './movie-detail/movie-timeline/movie-timeline-rating/movie-timeline-rating.component';
import { MovieTimelineCommentComponent } from './movie-detail/movie-timeline/movie-timeline-comment/movie-timeline-comment.component';
import { MovieTimelineNewMovieComponent } from './movie-detail/movie-timeline/movie-timeline-new-movie/movie-timeline-new-movie.component';
import { MovieStatsService } from './services/movie-stats.service';
import { ListFilterComponent } from './movie-list/list-filter/list-filter.component';
import { RecentlyChangedComponent } from './movie-stats/recently-added/recently-changed.component';
import { MovieSingleRatingComponent } from './movie-detail/movie-ratings/movie-single-rating/movie-single-rating.component';
import { MovieCommentFormComponent } from './movie-detail/movie-comment-form/movie-comment-form.component';
import { ListPagerComponent } from './movie-list/list-pager/list-pager.component';
import { ListExtendedFilterComponent } from './movie-list/list-extended-filter/list-extended-filter.component';
import { MoviePeopleService } from './services/movie-people.service';
import { ListPersonFilterComponent } from './movie-list/list-extended-filter/list-person-filter/list-person-filter.component';
import { MovieCollectionsComponent } from './movie-collections/movie-collections.component';
import { MovieCollectionsService } from './services/movie-collections.service';
import { MovieSearchComponent } from './movie-request/movie-search/movie-search.component';

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
    ListSettingsComponent,
    ListFilterComponent,
    MovieStatsComponent,
    MovieSelectComponent,
    MovieDetailComponent,
    MovieRatingComponent,
    MovieRatingsComponent,
    MovieRequestComponent,
    MovieRequestListComponent,
    MovieTimelineComponent,
    MovieOutstandingComponent,
    MovieDetailTableComponent,
    MovieDetailSummaryComponent,
    MovieDetailPosterComponent,
    MovieWatchlistIconComponent,
    MovieRequestModComponent,
    MovieRequestUserComponent,
    MovieTimelineRatingComponent,
    MovieTimelineCommentComponent,
    MovieTimelineNewMovieComponent,
    RecentlyChangedComponent,
    MovieSingleRatingComponent,
    MovieCommentFormComponent,
    ListPagerComponent,
    ListExtendedFilterComponent,
    ListPersonFilterComponent,
    MovieCollectionsComponent,
    MovieSearchComponent
  ],
  providers: [
    MovieUserGuard,

    MovieUsersService,
    MovieListService,
    MovieDetailService,
    MovieRatingsService,
    MovieRequestService,
    MovieStatsService,
    MovieCollectionsService,
    MoviePeopleService,
    OldSiteService
  ]
})
export class MoviesModule {
}
