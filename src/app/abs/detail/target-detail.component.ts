import { OnDestroy, OnInit } from "@angular/core";
import { TargetDetail } from "../models/target";
import { ShortRating } from "../../shared/models/ratings";
import { FullUser, User } from "../../core/models/user";
import { UserService } from "../../core/services/user.service";
import { TargetUsersService } from "../services/target-users.service";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs/Subscription";

export abstract class TargetDetailComponent<TD extends TargetDetail<ShortRating>, TUS extends TargetUsersService> implements OnInit, OnDestroy {

  target : TD;

  loggedInUser : FullUser;
  isTargetUser : boolean;

  targetUsers : User[];

  private userSubscription : Subscription;
  private routeSubscription : Subscription;

  constructor(protected userService : UserService,
              private targetUsersService : TUS,
              private route : ActivatedRoute) {
  }


  ngOnInit() : void {
    this.isTargetUser = false;

    //Subscribe to the route and get the pre-fetched target from it.
    this.routeSubscription = this.route.data.subscribe(
      (data : { detail : TD }) => {
        this.target = data.detail;
      }
    );

    //Also keep track on user changes to show modify options.
    this.userSubscription = this.userService.userChangeFeed().subscribe(
      user => {
        this.loggedInUser = user;
        this.isTargetUser = this.checkTargetUser(user);
      }
    );

    this.targetUsersService.getPromisedUsers().subscribe(
      users => this.targetUsers = users
    );
  }

  ngOnDestroy() : void {
    this.routeSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  protected abstract checkTargetUser(user : FullUser) : boolean;

}
