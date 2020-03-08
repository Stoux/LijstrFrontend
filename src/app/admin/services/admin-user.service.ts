import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { GrantedPermission, Permission, UserDetails } from '../../core/models/user';
import { Observable } from 'rxjs';
import { CachedSubject } from '../../shared/classes/cached-subject';

@Injectable()
export class AdminUserService {

  private permissionListSubject: CachedSubject<Permission[]>;

  constructor(private api: ApiService) {
    this.permissionListSubject = new CachedSubject(() => this.api.get<Permission[]>('/users/permissions/'));
  }

  /**
   * Get a list of all users.
   */
  getUsers(): Observable<UserDetails[]> {
    return this.api.get('/users');
  }

  /**
   * Get a list of all available permissions.
   */
  getPermissions(): Observable<Permission[]> {
    return this.permissionListSubject.asObservable();
  }

  /**
   * Update the permissions for the given user
   * @param userId ID of the user
   * @param permissions List of permissions starting with ROLE_
   */
  updatePermissions(userId: number, permissions: string[]): Observable<GrantedPermission[]> {
    return this.api.put(`/users/${userId}/permissions/`, {permissions});
  }

}
