import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShowsComponent } from "./shows.component";
import { ShowSelectComponent } from "./show-list/show-select/show-select.component";
import { ShowListComponent } from "./show-list/show-list.component";
import { ShowDetailComponent } from "./show-detail/show-detail.component";
import { ShowDetailResolver } from "./show-detail/resolver/show-detail-resolver";

const routes : Routes = [
  {
    path: '',
    component: ShowsComponent,
    children: [
      // {
      //   path: 'stats',
      //   component: MovieStatsComponent,
      //   data: {title: 'Filmstats'}
      // },
      {
        path: '',
        component: ShowListComponent,
        data: {title: 'Series'},
        children: [
          {
            path: ':id',
            component: ShowDetailComponent,
            data: {resolveTitle: 'detail.title'},
            resolve: {
              detail: ShowDetailResolver
            }
          },
          {
            path: '',
            component: ShowSelectComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    ShowDetailResolver
  ]
})
export class ShowsRoutingModule {
}
