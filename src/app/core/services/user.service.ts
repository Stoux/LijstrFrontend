import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { FullUser } from "./models/user";
import { ApiService } from "./api.service";
import { Observable } from "rxjs";

@Injectable()
export class UserService {

  private api : ApiService;
  private authService : AuthService;

  private user : FullUser;

  constructor(api : ApiService, authService : AuthService) {
    console.log("Created UserService");
    this.api = api;
    this.authService = authService;

    this.authService.hasAccess()
      .subscribe(hasToken => {
        if (hasToken) {
          console.log("[Auth] Token found");
          this.getLoggedInUser().subscribe(
            user => this.user = user,
            error => {
              console.error('[RIP] Failed to fetch user: ' + error.toString());
              this.user = null;
            }
          );
        } else {
          console.log("[Auth] No token found");
          this.user = null;
        }
      });
  }

  /**
   * Get the currently logged in user.
   * @returns {FullUser} the user or null
   */
  getLoggedInUser() : Observable<FullUser> {
    return this.getUser(this.authService.getUserId());
  }

  /**
   * Get a user by their ID.
   * You will need to be the user who is request the data or be an admin.
   * @param id The ID of the user
   * @returns {FullUser} the user
   */
  getUser(id : number) : Observable<FullUser> {
    return this.api.get('/users/' + id);
  }

}
