import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../services/user.service";
import { Observable } from "rxjs";
import { RedirectService } from "../services/redirect.service";


@Injectable()
export class UserGuard implements CanActivate {

  constructor(private userService : UserService,
              private redirect : RedirectService,
              private router : Router) {
  }

  canActivate(route : ActivatedRouteSnapshot, state : RouterStateSnapshot) : Observable<boolean>|Promise<boolean>|boolean {
    if (this.userService.isLoggedIn()) {
      return true;
    } else {
      this.redirect.setUrl(state.url);
      this.router.navigate(['/dashboard/login']);
      return false;
    }
  }

}
