import { Injectable } from '@angular/core';
import { ApiService } from "../../core/services/api.service";
import { ReplaySubject, Observable } from "rxjs";
import { User } from "../../core/models/user";
import { LijstrException } from "../../core/exceptions";

@Injectable()
export class MovieUsersService {

  private users : User[];
  private usersSubject : ReplaySubject<User[]>;

  constructor(apiService : ApiService) {
    this.usersSubject = new ReplaySubject(1);
    apiService.get('/movies/users/').subscribe(
      (users : User[]) => {
        this.users = users;
        this.usersSubject.next(users);
      },
      (error : LijstrException) => {
        console.log("RIP EVERYTHING.");
        console.log(LijstrException.toString(error));
      }
    );
  }

  /**
   * Get the users that are currently loaded.
   * @returns {User[]}
   */
  getUsers() : User[] {
    return this.users;
  }

  /**
   * Get the users when they are available.
   * Only returns one result and then completes.
   * @returns {Observable<User[]>}
   */
  getPromisedUsers() : Observable<User[]> {
    return this.usersSubject.asObservable().first();
  }

}
