import { Component } from "@angular/core";
import { AbstractListSettings, OrderedColumn } from "../../../abs/list/settings/list-settings.component";
import { ShowUsersService } from "../../services/show-users.service";

@Component({
  selector: 'lijstr-show-list-settings',
  templateUrl: './../../../abs/list/settings/list-settings.component.html',
  styleUrls: ['./../../../abs/list/settings/list-settings.component.css']
})
export class ShowListSettingsComponent extends AbstractListSettings<ShowUsersService> {

  constructor(targetUsersService : ShowUsersService) {
    super(
      targetUsersService,
      'shows',
      [new OrderedColumn("imdbRating", null, true)]
    );
  }
  
}
