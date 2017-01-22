import { Injectable } from "@angular/core";
import { AuthenticationRequest, AuthenticationToken } from "../models/authentication";
import { AuthService } from "./auth.service";
import { ApiService } from "./api.service";
import { Subject, Observable } from "rxjs";
import { UserService } from "./user.service";
import { FullUser } from "../models/user";

@Injectable()
export class LoginService {

  private loginSubject : Subject<FullUser>;

  constructor(private api : ApiService,
              private authService : AuthService,
              private userService : UserService) {
  }

  /**
   * Attempt to login with the provided auth data.
   * @param request the auth data
   * @returns {Observable<FullUser>} the user if successful
   */
  login(request : AuthenticationRequest) : Observable<FullUser> {
    //Check if there's already a request going
    if (this.loginSubject != null) {
      return this.getLoginStatus();
    }

    //Create a new request
    this.loginSubject = new Subject();
    let post : Observable<AuthenticationToken> = this.api.post('/auth', request, false);
    post.subscribe(
      newToken => {
        console.log("Got a new token for: " + newToken.userId);
        this.authService.useNewToken(newToken);
        this.userService.userChangeFeed()
          .filter(x => x != null)
          .first()
          .timeout(5000)
          .subscribe(
            user => {
              console.log("Found the user.");
              this.loginSubject.next(user);
              this.complete();
            },
            error => { //Should be a timeout?
              console.log("Token has been received.. but no user? wtf");
              this.finishError("Failed to get user...? Shit's broken.");
            }
          );
      },
      error => {
        console.log("Failed to login: " + error.message);
        this.finishError(error);
      }
    );
    return this.loginSubject;
  }

  private finishError(error : any) {
    this.loginSubject.error(error);
    this.complete();
  }

  private complete() {
    this.loginSubject.complete();
    this.loginSubject = null;
  }

  /**
   * Get the login status if there's already a login attempt ongiong.
   * Otherwise it returns null.
   * @returns {Observable<FullUser>}
   */
  getLoginStatus() : Observable<FullUser> {
    return this.loginSubject == null ? null : this.loginSubject.asObservable();
  }

  /**
   * Remove the token and 'logout'.
   * The token will still be valid, it's just no longer in storage.
   *
   * By passing allDevices=true it will increment the validating key on the server.
   * This has as effect that all token refresh requests with old tokens will be blocked.
   * @param allDevices Logout on all devices (TODO: Not implemented)
   * @returns {boolean} logged out
   */
  logout(allDevices : boolean = false) : boolean {
    if (!this.userService.isLoggedIn()) {
      return false;
    }

    if (!allDevices) {
      this.authService.removeToken();
      return true;
    }

    //TODO: Make a request to increment validating key on server
    this.authService.removeToken();
    return true;
  }

}
