import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlMatchResult, UrlSegment } from '@angular/router';
import { ShowsComponent } from './shows.component';
import { ShowListComponent } from './show-list/show-list.component';
import { ShowDetailComponent } from './show-detail/show-detail.component';
import { ShowDetailResolverService } from './show-detail/show-detail-resolver.service';
import { ShowSeasonDetailComponent } from './show-season-detail/show-season-detail.component';
import { ShowDetail, ShowSeasonDetail } from './models/show';
import { ShowSeasonDetailResolverService } from './show-season-detail/show-season-detail-resolver.service';


const routes: Routes = [
  {
    path: '',
    component: ShowsComponent,
    children: [
      {
        path: '',
        component: ShowListComponent,
        data: {title: 'Series'},
        children: [
          {
            path: ':showId',
            component: ShowDetailComponent,
            data: { resolveTitle: 'showDetail.title' },
            resolve: {
              showDetail: ShowDetailResolverService
            }
          },
          {
            matcher: (segments, group, route) => {
              // First segment should be the show ID
              if (segments.length < 2 || !segments[0].path.match(/^\d+$/)) {
                return null;
              }

              // Path to a season | /:showId/seasons/:seasonNumber
              if (segments.length === 3 && segments[1].path === 'seasons' && segments[2].path.match(/^\d+$/)) {
                return { consumed: segments, posParams: { showId: segments[0], seasonNumber: segments[2] } };
              }

              // Path to the specials (which is actually a season) | /:showId/specials
              if (segments.length === 2 && segments[1].path === 'specials') {
                // Create a fake url segment for the specials season
                return { consumed: segments, posParams: { showId: segments[0], seasonNumber: new UrlSegment('0', {}) } };
              }

              return null;
            },
            component: ShowSeasonDetailComponent,
            data: {
              resolveTitle: ( data: { show: ShowDetail, season: ShowSeasonDetail } ) => {
              return `${data.show.title} - ${data.season.title}`;
            }},
            resolve: {
              show: ShowDetailResolverService,
              season: ShowSeasonDetailResolverService,
            },
          }
        ],
      }
    ],
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class ShowsRoutingModule { }
