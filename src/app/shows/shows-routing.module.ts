import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowsComponent } from './shows.component';
import { ShowListComponent } from './show-list/show-list.component';
import { ShowDetailComponent } from './show-detail/show-detail.component';
import { ShowDetailResolverService } from './show-detail/show-detail-resolver.service';
import { ShowSeasonDetailComponent } from './show-season-detail/show-season-detail.component';
import { ShowDetail, ShowSeasonDetail } from './models/show';


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
            path: ':id',
            component: ShowDetailComponent,
            data: { resolveTitle: 'showDetail.title' },
            resolve: {
              showDetail: ShowDetailResolverService
            }
          },
          {
            path: ':showId/seasons/:seasonId',
            component: ShowSeasonDetailComponent,
            // data: {
            //   resolveTitle: ( data: { show: ShowDetail, season: ShowSeasonDetail } ) => {
            //   console.log(data);
            //   return `${data.show.title} - Season ?`;
            // }},
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
