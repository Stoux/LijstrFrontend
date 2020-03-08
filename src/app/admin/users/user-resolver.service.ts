import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { FullUser } from '../../core/models/user';
import { UserService } from '../../core/services/user.service';
import { Observable } from 'rxjs';

@Injectable()
export class UserResolver implements Resolve<FullUser> {

  constructor(private userService: UserService,
              private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FullUser> | FullUser {
    const userId = route.params.id;
    return this.userService.getUser(userId);
  }

}
