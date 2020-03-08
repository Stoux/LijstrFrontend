import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AdminUserService } from '../services/admin-user.service';
import { UserDetails } from '../../core/models/user';
import { LijstrException } from '../../core/exceptions';
import { ActivatedRoute, Router } from '@angular/router';
import { ColumnMode, SelectionType, TableColumn } from '@swimlane/ngx-datatable';

@Component({
  selector: 'lijstr-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit {

  public readonly tableColumnMode = ColumnMode.flex;
  public readonly tableSelectionType = SelectionType.single;

  public users: UserDetails[];
  public error: LijstrException;

  public columns: TableColumn[] = [];
  @ViewChild('permissionsCell') permissionsCell: TemplateRef<any>;
  @ViewChild('timestampCell') timestampCell: TemplateRef<any>;

  constructor(private adminUserService: AdminUserService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.adminUserService.getUsers().subscribe(
      users => {
        this.users = users;
      },
      error => {
        this.error = error;
      }
    );
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.columns = [

        { name: 'ID', prop: 'user.id', flexGrow: 1 },
        { name: 'Username', prop: 'user.username', flexGrow: 1 },
        { name: 'Display name', prop: 'user.displayName', flexGrow: 1 },
        { name: 'Last login', prop: 'lastLogin.timestamp', cellTemplate: this.timestampCell, flexGrow: 1 },
        { name: 'Permissions', prop: 'user.grantedPermissions', cellTemplate: this.permissionsCell, flexGrow: 1 },
      ];
    });
  }

  /**
   * Navigate to a single user.
   */
  public onUserSelected(event: {selected: UserDetails[]}): void {
    const userDetails: UserDetails = event.selected[0];
    this.router.navigate([userDetails.user.id], { relativeTo: this.route });
  }

  /**
   * Determine the height for the given row.
   *
   * @param userDetails The row item
   */
  public determineRowHeight(userDetails: UserDetails): number {
    // More room is needed depending on the ammount of permissions this user has
    const permissionsToShow = userDetails.user.grantedPermissions.length;
    const heightForPermissions = (permissionsToShow < 1 ? 1 : permissionsToShow) * 22;

    // Add default padding
    const defaultPadding = 18;
    return defaultPadding + heightForPermissions;
  }

}
