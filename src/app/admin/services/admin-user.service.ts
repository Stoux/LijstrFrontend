import { Injectable } from '@angular/core';
import { ApiService } from "../../core/services/api.service";
import { FullUser } from "../../core/models/user";
import { Observable } from "rxjs";

@Injectable()
export class AdminUserService {

  constructor(private api : ApiService) {

  }

  /**
   * Get a list of all users.
   * @returns {Observable<FullUser>}
   */
  getUsers() : Observable<FullUser[]> {
    return this.api.get('/users');
  }

}
