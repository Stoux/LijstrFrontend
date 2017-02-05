import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { UsersComponent } from "./users/users.component";
import { AddUserComponent } from "./users/add-user/add-user.component";
import { EditUserComponent } from "./users/edit-user/edit-user.component";
import { OldSiteSyncComponent } from "./dev/old-site-sync/old-site-sync.component";

const routes : Routes = [
  {
    path: '',
    component: AdminComponent,
    data: {title: 'Admin'}
  },
  {
    path: 'old-site-sync',
    component: OldSiteSyncComponent,
    data: {title: 'Site-sync'}
  },
  {
    path: 'users',
    component: UsersComponent,
    data: {title: 'Gebruikers'},
    children: [
      {
        path: 'add',
        component: AddUserComponent
      },
      {
        path: ':id',
        component: EditUserComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
