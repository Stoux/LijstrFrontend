import { NgModule } from "@angular/core";
import { ShowsComponent } from "./shows.component";
import { ShowDetailComponent } from "./show-detail/show-detail.component";
import { ShowListComponent } from "./show-list/show-list.component";
import { ShowSelectComponent } from "./show-list/show-select/show-select.component";
import { ShowListFilterComponent } from "./show-list/show-list-filter/show-list-filter.component";
import { ShowListPagerComponent } from "./show-list/show-list-pager/show-list-pager.component";
import { ShowListSettingsComponent } from "./show-list/show-list-settings/show-list-settings.component";
import { ShowUsersService } from "./services/show-users.service";
import { ShowListService } from "./services/show-list.service";
import { SharedModule } from "../shared/shared.module";
import { ShowsRoutingModule } from "./shows-routing.module";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ModalModule } from "ngx-bootstrap";
import { ShowDetailService } from "./services/show-detail.service";

@NgModule({
  imports: [
    SharedModule,
    ShowsRoutingModule,
    NgxDatatableModule,
    ModalModule.forRoot()
  ],
  declarations: [
    ShowsComponent,
    ShowDetailComponent,
    ShowListComponent,
    ShowSelectComponent,
    ShowListFilterComponent,
    ShowListPagerComponent,
    ShowListSettingsComponent
  ],
  providers: [
    ShowUsersService,
    ShowListService,
    ShowDetailService
  ]
})
export class ShowsModule {

}
