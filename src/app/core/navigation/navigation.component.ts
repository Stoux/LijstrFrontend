import { Component, OnInit } from "@angular/core";
import { UserService } from "../services/user.service";

@Component({
  selector: 'lijstr-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isCollapsed: boolean;
  name : string;
  loggedIn : boolean;
  admin : boolean;
  movieUser : boolean;

  constructor(public userService : UserService) {
  }

  ngOnInit() : void {
    this.loggedIn = false;
    this.admin = false;
    this.isCollapsed = true;

    this.userService.userChangeFeed()
      .subscribe(user => {
        this.loggedIn = this.userService.isLoggedIn();
        this.admin = this.userService.isAdmin();
        this.movieUser = this.userService.isMovieUser();
        this.name = (user == null ? null : user.displayName);
      });
  }

  toggleMenu() {
    this.isCollapsed = !this.isCollapsed;
  }

  collapseMenu() {
    this.isCollapsed = true;
  }

}
