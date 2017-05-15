import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShowsComponent } from "./shows.component";
import { ShowSelectComponent } from "./show-select/show-select.component";
import { ShowListComponent } from "./show-list/show-list.component";

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
          // {
          //   path: ':id',
          //   component: MovieDetailComponent,
          //   data: {resolveTitle: 'movieDetail.title'},
          //   resolve: {
          //     movieDetail: MovieDetailResolver
          //   }
          // },
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
    // MovieDetailResolver
  ]
})
export class ShowsRoutingModule {
}
