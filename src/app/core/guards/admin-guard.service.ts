import { Injectable } from "@angular/core";
import { CanLoad, Route, Router } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "../services/user.service";

@Injectable()
export class AdminGuard implements CanLoad {

  constructor(private userService : UserService, private router: Router) {
  }

  canLoad(route : Route) : Observable<boolean>|Promise<boolean>|boolean {
    if (this.userService.isAdmin()) {
      return true;
    } else {
      this.router.navigate(['/403']);
    }
  }
}
