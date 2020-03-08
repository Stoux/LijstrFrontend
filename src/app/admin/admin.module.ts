import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';
import { AdminUserService } from './services/admin-user.service';
import { RouterModule } from '@angular/router';
import { AddUserComponent } from './users/add-user/add-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { OldSiteSyncComponent } from './dev/old-site-sync/old-site-sync.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UserResolver } from './users/user-resolver.service';

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule,
    RouterModule,
    NgxDatatableModule,
  ],
  declarations: [
    AdminComponent,
    UsersComponent,
    AddUserComponent,
    EditUserComponent,
    OldSiteSyncComponent
  ],
  providers: [
    AdminUserService,
    UserResolver,
  ]
})
export class AdminModule {
}
