import { Injectable } from '@angular/core';
import { ApiService } from "../../core/services/api.service";
import { ReplaySubject, Observable } from "rxjs";
import { User } from "../../core/models/user";
import { LijstrException } from "../../core/exceptions";
import { TargetUsersService } from "../../abs/services/target-users.service";

@Injectable()
export class MovieUsersService extends TargetUsersService {

  constructor(apiService : ApiService) {
    super(apiService, 'movies');
  }

}
