import { Injectable } from '@angular/core';
import { AuthenticationToken, RefreshRequest } from '../models/authentication';
import { Observable, ReplaySubject } from 'rxjs';
import { ApiService } from './api.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {

  constructor(private api: ApiService) {
    this.tokenSubject = new ReplaySubject(1);
    const auth = this;
    api.addHeaderInterceptor({
      inject(headers, shouldUseToken): HttpHeaders {
        return auth.injectToken(headers, shouldUseToken);
      }
    });

    const foundToken = AuthService.retrieveStoredToken();
    this.validateFoundToken(foundToken, true);
  }

  private static readonly TOKEN_KEY: string = 'LijstrAuthToken';
  private static readonly REFRESH_BUFFER: number = 60 * 1000;

  private tokenSubject: ReplaySubject<boolean>;
  private authToken: AuthenticationToken;
  private refreshTimer: any;

  private static retrieveStoredToken(): AuthenticationToken {
    const item = localStorage.getItem(AuthService.TOKEN_KEY);
    if (item == null) {
      return null;
    } else {
      return JSON.parse(item);
    }
  }

  private static storeToken(authToken: AuthenticationToken): void {
    const json = JSON.stringify(authToken);
    localStorage.setItem(AuthService.TOKEN_KEY, json);
  }

  private static removeToken(): void {
    localStorage.removeItem(AuthService.TOKEN_KEY);
  }

  /**
   * Observable feed whether the app currently has access to the API (Authorized endpoints).
   */
  accessFeed(): Observable<boolean> {
    return this.tokenSubject.asObservable();
  }

  /**
   * Get the userId associated with the current userId.
   * @returns the id or null
   */
  getUserId(): number {
    return this.authToken != null ? this.authToken.userId : null;
  }

  /**
   * Use a new token.
   * @param authToken the token
   */
  useNewToken(authToken: AuthenticationToken) {
    this.newToken(authToken);
  }

  /**
   * Check if the current token (if any) is still valid.
   */
  validateToken() {
    if (this.authToken == null) {
      return;
    }

    this.clearRefreshTimer();
    this.validateFoundToken(this.authToken, false);
  }

  private validateFoundToken(foundToken: AuthenticationToken, notifySubject: boolean = false) {
    if (foundToken == null) {
      this.tokenSubject.next(false);
      return;
    }

    // Check if still valid
    const time = new Date().getTime();
    if (foundToken.validTill < time) {
      this.removeToken();
      return;
    }

    // Check if access expired
    if (foundToken.accessTill - AuthService.REFRESH_BUFFER < time) {
      this.refreshToken(foundToken.token);
      return;
    }

    // Still has access
    this.authToken = foundToken;
    if (notifySubject) {
      this.tokenSubject.next(true);
    }
    this.startRefreshTimer();
  }


  private refreshToken(currentToken: string) {
    const refreshRequest = new RefreshRequest(currentToken);
    const post: Observable<AuthenticationToken> = this.api.post('/auth/refresh', refreshRequest, false);
    post.subscribe(
      token => {
        this.newToken(token);
      },
      error => {
        console.log('Failed to refresh token... '); // TODO: Notify the user instead of the log?
        this.removeToken();
      }
    );
  }

  removeToken() {
    this.tokenSubject.next(false);
    AuthService.removeToken();
  }

  private newToken(newToken: AuthenticationToken) {
    AuthService.storeToken(newToken);
    this.authToken = newToken;
    this.tokenSubject.next(true);
    this.startRefreshTimer();
  }

  private clearRefreshTimer() {
    if (this.refreshTimer != null) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = null;
    }
  }

  private startRefreshTimer() {
    this.clearRefreshTimer();

    const timeLeft = this.authToken.accessTill - AuthService.REFRESH_BUFFER - (new Date().getTime());
    console.log('Refreshing token in ' + (timeLeft / 1000) + ' seconds.');
    console.log('=> Which is ' + Math.floor(timeLeft / 1000 / 60) + ' minutes.');
    this.refreshTimer = setTimeout(() => this.refreshToken(this.authToken.token), timeLeft);
  }

  private injectToken(headers: HttpHeaders, shouldInjectToken: boolean) {
    if (shouldInjectToken && this.authToken != null) {
      return headers.set('Authorization', this.authToken.token);
    } else {
      return headers;
    }
  }

}
