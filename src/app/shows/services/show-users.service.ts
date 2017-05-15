import { Injectable } from '@angular/core';
import { TargetUsersService } from "../../abs/services/target-users.service";
import { ApiService } from "../../core/services/api.service";

@Injectable()
export class ShowUsersService extends TargetUsersService{

  constructor(apiService : ApiService) {
    super(apiService, 'shows');
  }

}
