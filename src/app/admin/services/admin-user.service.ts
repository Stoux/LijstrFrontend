import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { GrantedPermission, Permission, UserDetails } from '../../core/models/user';
import { Observable } from 'rxjs';

@Injectable()
export class AdminUserService {

  constructor(private api: ApiService) {

  }

  /**
   * Get a list of all users.
   */
  getUsers(): Observable<UserDetails[]> {
    return this.api.get('/users');
  }

}
