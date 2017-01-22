import { Injectable } from "@angular/core";
import { AuthenticationToken, RefreshRequest } from "../models/authentication";
import { Observable, ReplaySubject } from "rxjs";
import { ApiService } from "./api.service";
import { Headers } from "@angular/http";

@Injectable()
export class AuthService {

  private static readonly TOKEN_KEY : string = "LijstrAuthToken";
  private static readonly REFRESH_BUFFER : number = 60 * 1000;

  private tokenSubject : ReplaySubject<boolean>;
  private authToken : AuthenticationToken;
  private refreshTimer : any;

  constructor(private api : ApiService) {
    console.log("Created AuthService");
    this.tokenSubject = new ReplaySubject(1);
    const auth = this;
    api.addHeaderInterceptor({
      inject(headers, shouldUseToken) {
        return auth.injectToken(headers, shouldUseToken);
      }
    });

    let foundToken = AuthService.retrieveStoredToken();
    if (foundToken == null) {
      this.tokenSubject.next(false);
      return;
    }

    //Check if still valid
    let time = new Date().getTime();
    if (foundToken.validTill < time) {
      this.removeToken();
      return;
    }

    //Check if access expired
    if (foundToken.accessTill - AuthService.REFRESH_BUFFER < time) {
      this.refreshToken(foundToken.token);
      return;
    }

    //Still has access
    this.authToken = foundToken;
    this.tokenSubject.next(true);
    this.startRefreshTimer();
  }

  /**
   * Observable feed whether the app currently has access to the API (Authorized endpoints).
   * @returns {Observable<boolean>}
   */
  accessFeed() : Observable<boolean> {
    return this.tokenSubject.asObservable();
  }

  /**
   * Get the userId associated with the current userId.
   * @returns {number} the id or null
   */
  getUserId() : number {
    return this.authToken != null ? this.authToken.userId : null;
  }

  /**
   * Use a new token.
   * @param authToken the token
   */
  useNewToken(authToken : AuthenticationToken) {
    this.newToken(authToken);
  }

  private refreshToken(currentToken : string) {
    console.log("Refreshing token...");
    let refreshRequest = new RefreshRequest(currentToken);
    let post : Observable<AuthenticationToken> = this.api.post('/auth/refresh', refreshRequest, false);
    post.subscribe(
      token => {
        this.newToken(token);
      },
      error => {
        console.log("Failed to refresh token... "); //TODO: Notify the user instead of the log?
        this.removeToken();
      }
    );
  }

  removeToken() {
    this.tokenSubject.next(false);
    AuthService.removeToken();
  }

  private newToken(newToken : AuthenticationToken) {
    AuthService.storeToken(newToken);
    this.authToken = newToken;
    this.tokenSubject.next(true);
    this.startRefreshTimer();
  }

  private startRefreshTimer() {
    if (this.refreshTimer != null) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = null;
    }

    let timeLeft = this.authToken.accessTill - AuthService.REFRESH_BUFFER - (new Date().getTime());
    console.log("Refreshing token in " + (timeLeft / 1000) + " seconds.");
    console.log("=> Which is " + Math.floor(timeLeft / 1000 / 60) + " minutes.");
    this.refreshTimer = setTimeout(() => this.refreshToken(this.authToken.token), timeLeft);
  }

  private injectToken(headers : Headers, shouldInjectToken : boolean) {
    if (shouldInjectToken && this.authToken != null) {
      headers.set("Authorization", this.authToken.token);
    }
  }

  private static retrieveStoredToken() : AuthenticationToken {
    let item = localStorage.getItem(AuthService.TOKEN_KEY);
    if (item == null) {
      return null;
    } else {
      return JSON.parse(item);
    }
  }

  private static storeToken(authToken : AuthenticationToken) : void {
    let json = JSON.stringify(authToken);
    localStorage.setItem(AuthService.TOKEN_KEY, json);
  }

  private static removeToken() : void {
    localStorage.removeItem(AuthService.TOKEN_KEY);
  }

}
