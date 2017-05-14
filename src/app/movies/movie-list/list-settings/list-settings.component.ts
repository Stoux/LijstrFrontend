import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from "@angular/core";
import { User } from "../../../core/models/user";
import { MovieUsersService } from "../../services/movie-users.service";

class OrderedColumn {
  constructor(public prop : string,
              public title : string,
              public enabled : boolean) {}
}

@Component({
  selector: 'lijstr-list-settings',
  templateUrl: './list-settings.component.html',
  styleUrls: ['./list-settings.component.css']
})
export class ListSettingsComponent implements OnInit {

  private static readonly COLUMNS_KEY = "enabledColumns";
  private static readonly USERS_KEY = "enabledUserColumns";

  @Input() requiredColumns : {}[];
  @Input() availableColumns : {}[];
  @Input() userTemplateRef : TemplateRef<any>;
  availableUsers : {}[];
  @Output() orderedColumns = new EventEmitter<{}[]>();
  @Output() editable = new EventEmitter<boolean>();

  enabledColumns : OrderedColumn[];
  enabledUsers : OrderedColumn[];

  constructor(private mUsersService : MovieUsersService) {
    this.enabledColumns = [];
    this.availableUsers = null;
  }

  ngOnInit() {
    this.enabledColumns = ListSettingsComponent.getEnabled(
      ListSettingsComponent.COLUMNS_KEY,
      this.availableColumns,
      [new OrderedColumn("year", null, true), new OrderedColumn("imdbRating", null, true)]
    );

    //Get users
    let users = this.mUsersService.getUsers();
    if (users == null) {
      this.mUsersService.getPromisedUsers().subscribe(
        (users : User[]) => {
          this.setAvailableUsers(users);
          this.emit();
        }
      );
    } else {
      this.setAvailableUsers(users);
    }

    this.emit();
  }

  private static getEnabled(key : string, columns : {}[], defaults : OrderedColumn[] = []) : OrderedColumn[] {
    //Get from storage
    let val = localStorage.getItem(key);
    let enabledProps : OrderedColumn[];
    if (val == null) {
      enabledProps = defaults;
    } else {
      enabledProps = JSON.parse(val);
    }

    //Transform
    let result : OrderedColumn[] = [];
    for (let enabledProp of enabledProps) {
      for (let column of columns) {
        if (column['prop'] == enabledProp.prop) {
          enabledProp.title = column['name'];
          result.push(enabledProp);
          break;
        }
      }
    }

    for (let column of columns) {
      let found = false;
      for (let enabledProp of result) {
        if (column['prop'] == enabledProp.prop) {
          found = true;
          break;
        }
      }

      if (!found) {
        result.push(new OrderedColumn(column['prop'], column['name'], false));
      }
    }

    ListSettingsComponent.saveEnabled(key, result);
    return result;
  }

  private static saveEnabled(key : string, enabled : OrderedColumn[]) {
    localStorage.setItem(key, JSON.stringify(enabled));
  }

  private setAvailableUsers(users : User[]) {
    this.availableUsers = [];
    for (let user of users) {
      this.availableUsers.push(
        {name: user.displayName, prop: "latestMovieRatings." + user.id, flexGrow: 1,
          cellTemplate: this.userTemplateRef}
      );
    }
    this.enabledUsers = ListSettingsComponent.getEnabled(
      ListSettingsComponent.USERS_KEY,
      this.availableUsers
    );
    this.editable.next(true);
  }

  emit() {
    let availableColumns = ListSettingsComponent.enabledFromList(
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

  private static enabledFromList(available : {}[], enabled : OrderedColumn[], key : string) {
    let result = [];
    for (let orderedColumn of enabled) {
      if (orderedColumn.enabled) {
        for(let column of available) {
          if (column['prop'] == orderedColumn.prop) {
            result.push(column);
            break;
          }
        }
      }
    }
    this.saveEnabled(key, enabled);
    return result;
  }

  moveInArray(array : any[], old_index : number, new_index : number) {
    if (new_index >= array.length) {
      let k = new_index - array.length;
      while ((k--) + 1) {
        array.push(undefined);
      }
    }
    array.splice(new_index, 0, array.splice(old_index, 1)[0]);
  }

}
