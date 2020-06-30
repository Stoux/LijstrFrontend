import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowsComponent } from './shows.component';
import { ShowListComponent } from './show-list/show-list.component';


const routes: Routes = [
  {
    path: '',
    component: ShowsComponent,
    children: [
      {
        path: '',
        component: ShowListComponent,
        data: {title: 'Series'},
        children: [],
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
