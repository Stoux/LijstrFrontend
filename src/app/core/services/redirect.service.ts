import { Injectable } from '@angular/core';

@Injectable()
export class RedirectService {

  /**
   * URL used for navigating to after logging in.
   */
  private redirectUrl;

  constructor() { }

  setUrl(url : string) {
    this.redirectUrl = url;
  }

  getUrl() {
    let url = this.redirectUrl;
    this.redirectUrl = null;
    return url;
  }

}
