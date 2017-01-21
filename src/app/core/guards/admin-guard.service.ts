import { Injectable } from "@angular/core";
import { CanLoad, Route, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "../services/user.service";
import { RedirectService } from "../services/redirect.service";

@Injectable()
export class AdminGuard implements CanLoad, CanActivate {

  constructor(private userService : UserService,
              private redirect : RedirectService,
              private router: Router) {
  }

  canLoad(route : Route) : boolean {
    return this.handle(route.path);
  }

  canActivate(route : ActivatedRouteSnapshot, state : RouterStateSnapshot) : boolean {
    return this.handle(state.url);
  }

  private handle(url : string) : boolean {
    if (this.userService.isAdmin()) {
      return true;
    } else if (this.userService.isLoggedIn()) {
      this.router.navigate(['/403']);
      return false;
    } else {
      this.redirect.setUrl(url);
      this.router.navigate(['/dashboard/login']);
      return false;
    }
  }


}
