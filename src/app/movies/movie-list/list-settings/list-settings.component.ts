import {Component, OnInit, Input, Output, EventEmitter, TemplateRef, AfterViewInit} from '@angular/core';
import { User } from '../../../core/models/user';
import { MovieUsersService } from '../../services/movie-users.service';

class OrderedColumn {
  constructor(public prop: string,
              public title: string,
              public enabled: boolean) {}
}

@Component({
  selector: 'lijstr-list-settings',
  templateUrl: './list-settings.component.html',
  styleUrls: ['./list-settings.component.css']
})
export class ListSettingsComponent implements OnInit {

  constructor(private mUsersService: MovieUsersService) {
    this.enabledColumns = [];
    this.availableUsers = null;
  }

  private static readonly COLUMNS_KEY = 'enabledColumns';
  private static readonly USERS_KEY = 'enabledUserColumns';

  @Input() requiredColumns: {}[];
  @Input() availableColumns: {}[];
  @Input() userTemplateRef: TemplateRef<any>;
  availableUsers: {}[];
  @Output() orderedColumns = new EventEmitter<{}[]>();
  @Output() editable = new EventEmitter<boolean>();

  enabledColumns: OrderedColumn[];
  enabledUsers: OrderedColumn[];

  private static getEnabled(key: string, columns: any[], defaults: OrderedColumn[] = []): OrderedColumn[] {
    // Get from storage
    const val = localStorage.getItem(key);
    let enabledProps: OrderedColumn[];
    if (val == null) {
      enabledProps = defaults;
    } else {
      enabledProps = JSON.parse(val);
    }

    // Transform
    const result: OrderedColumn[] = [];
    for (const enabledProp of enabledProps) {
      for (const column of columns) {
        if (column.prop == enabledProp.prop) {
          enabledProp.title = column.name;
          result.push(enabledProp);
          break;
        }
      }
    }

    for (const column of columns) {
      let found = false;
      for (const enabledProp of result) {
        if (column.prop == enabledProp.prop) {
          found = true;
          break;
        }
      }

      if (!found) {
        result.push(new OrderedColumn(column.prop, column.name, false));
      }
    }

    ListSettingsComponent.saveEnabled(key, result);
    return result;
  }

  private static saveEnabled(key: string, enabled: OrderedColumn[]) {
    localStorage.setItem(key, JSON.stringify(enabled));
  }

  private static enabledFromList(available: any[], enabled: OrderedColumn[], key: string) {
    const result = [];
    for (const orderedColumn of enabled) {
      if (orderedColumn.enabled) {
        for (const column of available) {
          if (column.prop == orderedColumn.prop) {
            result.push(column);
            break;
          }
        }
      }
    }
    this.saveEnabled(key, enabled);
    return result;
  }

  ngOnInit() {
    this.enabledColumns = ListSettingsComponent.getEnabled(
      ListSettingsComponent.COLUMNS_KEY,
      this.availableColumns,
      [new OrderedColumn('year', null, true), new OrderedColumn('imdbRating', null, true)]
    );

    // Get users
    const users = this.mUsersService.getUsers();
    if (users == null) {
      this.mUsersService.getPromisedUsers().subscribe(
        (foundUsers: User[]) => {
          this.setAvailableUsers(foundUsers);
          this.emit();
        }
      );
    } else {
      this.setAvailableUsers(users);
    }

    setTimeout(() => this.emit(), 1);
  }

  private setAvailableUsers(users: User[]) {
    this.availableUsers = [];
    for (const user of users) {
      this.availableUsers.push(
        {name: user.displayName, prop: 'latestRatings.' + user.id, flexGrow: 1,
          cellTemplate: this.userTemplateRef}
      );
    }
    this.enabledUsers = ListSettingsComponent.getEnabled(
      ListSettingsComponent.USERS_KEY,
      this.availableUsers
    );

    // Wait for components to init (if already loaded)
    setTimeout(() => this.editable.next(true));
  }

  emit() {
    const availableColumns = ListSettingsComponent.enabledFromList(
      this.availableColumns, this.enabledColumns, ListSettingsComponent.COLUMNS_KEY
    );
    let enabledUsers = [];
    if (this.enabledUsers != null) {
       enabledUsers = ListSettingsComponent.enabledFromList(
         this.availableUsers, this.enabledUsers, ListSettingsComponent.USERS_KEY
       );
    }
    this.orderedColumns.emit(this.requiredColumns.concat(availableColumns, enabledUsers));
  }

  moveInArray(array: any[], oldIndex: number, newIndex: number) {
    if (newIndex >= array.length) {
      let k = newIndex - array.length;
      while ((k--) + 1) {
        array.push(undefined);
      }
    }
    array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
  }

}
