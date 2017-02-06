import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from "@angular/router";
import { UserService } from "../../../core/services/user.service";

@Injectable()
export class MovieUserGuard implements CanActivate {

  constructor(private userService : UserService,
              private router: Router) { }

  canActivate(route : ActivatedRouteSnapshot, state : RouterStateSnapshot) : boolean {
    if (this.userService.isMovieUser()) {
      return true;
    } else {
      this.router.navigate(['/403']);
      return false;
    }
  }
}
