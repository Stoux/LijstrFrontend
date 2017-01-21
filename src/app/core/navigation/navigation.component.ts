import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";

@Component({
  selector: 'lijstr-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  name : string;
  loggedIn : boolean;
  admin : boolean;

  constructor(public userService : UserService) {
    this.loggedIn = false;
    this.admin = false;
  }

  ngOnInit() : void {
    this.userService.userChangeFeed()
      .subscribe(user => {
        this.loggedIn = this.userService.isLoggedIn();
        this.admin = this.userService.isAdmin();
        this.name = (user == null ? null : user.displayName);
      });
  }
}
