import { User } from "../../core/models/user";
import { ReplaySubject } from "rxjs/ReplaySubject";
import { ApiService } from "../../core/services/api.service";
import { LijstrException } from "../../core/exceptions";
import { Observable } from "rxjs/Observable";

export abstract class TargetUsersService {

  private users : User[];
  private usersSubject : ReplaySubject<User[]>;

  constructor(protected apiService : ApiService,
              private path : string) {
    this.usersSubject = new ReplaySubject(1);
    this.apiService.get('/' + this.path + '/users/').subscribe(
      (users : User[]) => {
        this.users = users;
        this.usersSubject.next(users);
      },
      (error : LijstrException) => {
        //TODO: More graceful error handling, the app pretty much doesn't work if this happens.
        console.log("Failed to fetch users for: " + this.path);
        console.error(LijstrException.toString(error));
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

  /**
   * Find the correct user in an array of users.
   * @param id The ID of the user
   * @param users The array of users
   * @returns {user|null}
   */
  static findUser(id : number, users : User[]) : User {
    if (users == null) {
      return null;
    }
    for (let user of users) {
      if (user.id == id) {
        return user;
      }
    }
    return null;
  }


}
