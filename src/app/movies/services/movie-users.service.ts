import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { BaseUsersService } from '../../shared/services/base-users.service';

@Injectable()
export class MovieUsersService extends BaseUsersService {

  constructor(apiService: ApiService) {
    super(apiService, `/movies/users/`);
  }

}
