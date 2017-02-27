import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { FullUser } from "../models/user";
import { ApiService } from "./api.service";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable()
export class UserService {

  private api : ApiService;
  private authService : AuthService;

  private user : FullUser;
  private userSubject : BehaviorSubject<FullUser>;

  constructor(api : ApiService, authService : AuthService) {
    this.api = api;
    this.authService = authService;
    this.userSubject = new BehaviorSubject(this.user);
    this.authService.accessFeed().subscribe(hasToken => {
      this.handleNewToken(hasToken);
    });
  }

  private handleNewToken(hasToken) {
    if (hasToken) {
      console.log("[Auth] Token found");
      this.getLoggedInUser().subscribe(
        user => {
          this.setUser(user)
        },
        error => {
          console.error('[RIP] Failed to fetch user: ' + error.toString());
          this.setUser(null);
        }
      );
    } else {
      console.log("[Auth] No token found");
      this.setUser(null);
    }
  }

  /**
   * Get the currently logged in user.
   * @returns {FullUser} the user or null
   */
  private getLoggedInUser() : Observable<FullUser> {
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

  /**
   * Check whether the user is currently logged in.
   * @returns {boolean} is logged in
   */
  isLoggedIn() : boolean {
    return this.user != null;
  }

  /**
   * Check whether the user is an admin.
   * @returns {boolean}
   */
  isAdmin() : boolean {
    return this.hasRole('ROLE_ADMIN');
  }

  /**
   * Check whether the user has access to the movie tools.
   * @returns {boolean}
   */
  isMovieUser() : boolean {
    return this.hasRole('ROLE_MOVIE');
  }

  /**
   * Check whether the user is a movie mod.
   * @returns {boolean}
   */
  isMovieMod() : boolean {
    return this.hasRole('ROLE_MOVIE_MOD');
  }

  /**
   * Observable feed of the current state of the logged in user.
   * @returns {Observable<FullUser>}
   */
  userChangeFeed() : Observable<FullUser> {
    return this.userSubject.asObservable();
  }

  private setUser(user : FullUser) {
    this.user = user;
    this.userSubject.next(user);
  }

  private hasRole(...permissions : string[]) : boolean {
    if (this.user == null) return false;
    for (let grantedPermission of this.user.grantedPermissions) {
      if (permissions.indexOf(grantedPermission.authority) >= 0) {
        return true;
      }
    }
    return false;
  }

}
