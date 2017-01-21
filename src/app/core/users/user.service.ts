import { Injectable, OnInit } from "@angular/core";
import { AuthService } from "./auth.service";
import { FullUser } from "./models/user";

@Injectable()
export class UserService implements OnInit {

  private user : FullUser;

  private authService : AuthService;

  constructor(authService : AuthService) {
    this.authService = authService;
  }

  ngOnInit() : void {
    this.authService.hasAccess()
      .subscribe(hasToken => {
        if (hasToken) {
          this.fetchUser();
        } else {
          this.user = null;
        }
      });
  }

  /**
   * Get the currently logged in user.
   * @returns {FullUser} the user or null
   */
  getLoggedInUser() : FullUser {
    return this.user;
  }

  /**
   * Get a user by their ID.
   * You will need to be the user who is request the data or be an admin.
   * TODO: Return a Promise/Obserable
   * @param id The ID of the user
   * @returns {FullUser} the user
   */
  getUser(id : number) : FullUser {
    return null;
  }

  private fetchUser() {
    //TODO: this.user = this.getUser(auth)
  }

}
