import { Component } from "@angular/core";
import { ShowDetail } from "../models/show";
import { TargetDetailComponent } from "../../abs/detail/target-detail.component";
import { ShowUsersService } from "../services/show-users.service";
import { FullUser } from "../../core/models/user";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../../core/services/user.service";

@Component({
  selector: 'lijstr-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrls: ['./show-detail.component.css']
})
export class ShowDetailComponent extends TargetDetailComponent<ShowDetail, ShowUsersService> {

  constructor(userService : UserService, targetUsersService : ShowUsersService, route : ActivatedRoute) {
    super(userService, targetUsersService, route);
  }

  protected checkTargetUser(user : FullUser) : boolean {
    return this.userService.isShowUser();
  }
}
