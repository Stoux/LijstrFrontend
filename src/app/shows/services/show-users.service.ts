import { Injectable } from '@angular/core';
import { BaseUsersService } from '../../shared/services/base-users.service';
import { ApiService } from '../../core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class ShowUsersService extends BaseUsersService {

  constructor(apiService: ApiService) {
    super(apiService, `/shows/users/`);
  }

}
