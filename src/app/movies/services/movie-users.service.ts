import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { ReplaySubject, Observable } from 'rxjs';
import { User } from '../../core/models/user';
import { LijstrException } from '../../core/exceptions';
import {first} from 'rxjs/operators';

@Injectable()
export class MovieUsersService {

  constructor(apiService: ApiService) {
    this.usersSubject = new ReplaySubject(1);
    apiService.get('/movies/users/').subscribe(
      (users: User[]) => {
        this.users = users;
        this.usersSubject.next(users);
      },
      (error: LijstrException) => {
        console.log('RIP EVERYTHING.');
        console.log(LijstrException.toString(error));
      }
    );
  }

  private users: User[];
  private usersSubject: ReplaySubject<User[]>;

  /**
   * Find the correct user in an array of users.
   * @param id The ID of the user
   * @param users The array of users
   */
  static findUser(id: number, users: User[]): User {
    if (users == null) {
      return null;
    }
    for (const user of users) {
      if (user.id == id) {
        return user;
      }
    }
    return null;
  }

  /**
   * Get the users that are currently loaded.
   */
  getUsers(): User[] {
    return this.users;
  }

  /**
   * Get the users when they are available.
   * Only returns one result and then completes.
   */
  getPromisedUsers(): Observable<User[]> {
    return this.usersSubject.asObservable().pipe(first());
  }

}
