import { NgModule } from '@angular/core';
import { ShowsComponent } from './shows.component';
import { SharedModule } from '../shared/shared.module';
import { ShowsRoutingModule } from './shows-routing.module';
import { ShowListComponent } from './show-list/show-list.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ShowDetailComponent } from './show-detail/show-detail.component';
import { ShowDetailTableComponent } from './show-detail/show-detail-table/show-detail-table.component';
import { ShowDetailSeasonsComponent } from './show-detail/show-detail-seasons/show-detail-seasons.component';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { ShowSeasonDetailComponent } from './show-season-detail/show-season-detail.component';

@NgModule({
    imports: [
        SharedModule,
        ShowsRoutingModule,
        NgxDatatableModule,
        SwiperModule,
    ],
  declarations: [
    ShowsComponent,
    ShowListComponent,
    ShowDetailComponent,
    ShowDetailTableComponent,
    ShowDetailSeasonsComponent,
    ShowSeasonDetailComponent
  ],
})
export class ShowsModule { }
