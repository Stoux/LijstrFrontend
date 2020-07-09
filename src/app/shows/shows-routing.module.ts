import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
            path: ':showId/seasons/:seasonNumber',
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
