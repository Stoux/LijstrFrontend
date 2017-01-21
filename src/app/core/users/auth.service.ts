import { Injectable, OnInit } from "@angular/core";
import { AuthenticationToken, RefreshRequest } from "./models/authentication";
import { Subject, Observable } from "rxjs";
import Timer = NodeJS.Timer;

@Injectable()
export class AuthService implements OnInit {

  private static readonly TOKEN_KEY : string = "LijstrAuthToken";
  private static readonly REFRESH_BUFFER : number = 60 * 1000;

  private tokenSubject : Subject<boolean>;
  private authToken : AuthenticationToken;
  private refreshTimer : Timer;

  constructor() {
    this.tokenSubject = new Subject();
  }

  ngOnInit() : void {
    console.log('Init AuthService');
    let foundToken = AuthService.retrieveStoredToken();
    if (foundToken == null) {
      this.tokenSubject.next(false);
      return;
    }

    //Check if still valid
    let time = new Date().getTime();
    if (foundToken.validTill < time) {
      this.tokenSubject.next(false);
      AuthService.removeToken();
      return;
    }

    //Check if access expired
    if (foundToken.accessTill - AuthService.REFRESH_BUFFER < time) {
      //TODO: Refresh the token
      //TODO: If success -> Register timeout
      //TODO:            -> tokenSubject.next(true)
      return;
    }

    //Still has access
    this.authToken = foundToken;
    this.tokenSubject.next(true);
    this.startRefreshTimer();
  }

  /**
   * Check whether the app currently has access to the API.
   * @returns {Observable<boolean>}
   */
  hasAccess() : Observable<boolean> {
    return this.tokenSubject.asObservable();
  }

  private refreshToken(currentToken : string) {
    let refreshRequest = new RefreshRequest(currentToken);
    //TODO: POST /auth/refresh
    //TODO: Return promise for an AuthToken
    //TODO: Store refreshToken in localStorage
    //TODO: Activate refresh timeout
  }

  private startRefreshTimer() {
    if (this.refreshTimer != null) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = null;
    }

    let timeLeft = this.authToken.validTill - AuthService.REFRESH_BUFFER - (new Date().getTime());
    this.refreshTimer = setTimeout(() => this.refreshToken(this.authToken.token), timeLeft);
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
