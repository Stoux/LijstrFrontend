import { NgModule } from '@angular/core';
import { ShowsComponent } from './shows.component';
import { SharedModule } from '../shared/shared.module';
import { ShowsRoutingModule } from './shows-routing.module';
import { ShowListComponent } from './show-list/show-list.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
    imports: [
        SharedModule,
        ShowsRoutingModule,
        NgxDatatableModule,
    ],
  declarations: [
    ShowsComponent,
    ShowListComponent
  ],
})
export class ShowsModule { }
