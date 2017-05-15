import { Component } from "@angular/core";
import { AbstractListFilter } from "../../../abs/list/list-modifier.components";
import { ShowSummary } from "../../models/show";
import { ShowListService } from "../../services/show-list.service";
import { UserService } from "../../../core/services/user.service";
import { User } from "../../../core/models/user";

@Component({
  selector: 'lijstr-show-list-filter',
  templateUrl: './show-list-filter.component.html',
  styleUrls: ['./show-list-filter.component.css']
})
export class ShowListFilterComponent extends AbstractListFilter<ShowSummary, ShowListService> {

  constructor(userService : UserService, listService : ShowListService) {
    super(userService, listService);
  }

  protected isTargetUser(newUser : User) : boolean {
    return this.userService.isShowUser();
  }

  protected applyExtraFilters(summaries : ShowSummary[]) : ShowSummary[] {
    return this.summaries;
  }

}
