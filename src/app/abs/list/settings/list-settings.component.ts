import { EventEmitter, Input, OnInit, Output, TemplateRef } from "@angular/core";
import { TargetUsersService } from "../../services/target-users.service";
import { User } from "../../../core/models/user";

export class OrderedColumn {
  constructor(public prop : string,
              public title : string,
              public enabled : boolean) {
  }
}

export abstract class AbstractListSettings<T extends TargetUsersService> implements OnInit {

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

  private columnsKey : string;
  private usersKey : string;

  constructor(protected targetUsersService : T,
              path : string,
              private defaultColumns : OrderedColumn[]) {
    this.enabledColumns = [];
    this.availableUsers = null;

    this.columnsKey = path + '.' + AbstractListSettings.COLUMNS_KEY;
    this.usersKey = path + '.' + AbstractListSettings.USERS_KEY;
  }

  ngOnInit() : void {
    this.enabledColumns = AbstractListSettings.getEnabled(
      this.columnsKey,
      this.availableColumns,
      this.defaultColumns
    );

    let users = this.targetUsersService.getUsers();
    if (users == null) {
      this.targetUsersService.getPromisedUsers().subscribe(
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


  private setAvailableUsers(users : User[]) {
    this.availableUsers = [];
    for (let user of users) {
      this.availableUsers.push(
        //TODO: Replace with 'latestRatings.'
        {
          name: user.displayName, prop: "latestMovieRatings." + user.id, flexGrow: 1,
          cellTemplate: this.userTemplateRef
        }
      );
    }

    this.enabledUsers = AbstractListSettings.getEnabled(
      this.usersKey,
      this.availableUsers
    );

    this.editable.next(true);
  }

  emit() {
    let availableColumns = AbstractListSettings.enabledFromList(
      this.availableColumns, this.enabledColumns, this.columnsKey
    );
    let enabledUsers = [];
    if (this.enabledUsers != null) {
      enabledUsers = AbstractListSettings.enabledFromList(
        this.availableUsers, this.enabledUsers, this.usersKey
      );
    }
    this.orderedColumns.emit(this.requiredColumns.concat(availableColumns, enabledUsers));
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

    AbstractListSettings.saveEnabled(key, result);
    return result;
  }

  private static enabledFromList(available : {}[], enabled : OrderedColumn[], key : string) {
    let result = [];
    for (let orderedColumn of enabled) {
      if (orderedColumn.enabled) {
        for (let column of available) {
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

  private static saveEnabled(key : string, enabled : OrderedColumn[]) {
    localStorage.setItem(key, JSON.stringify(enabled));
  }

}
