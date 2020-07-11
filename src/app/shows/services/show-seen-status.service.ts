import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from '../../core/services/user.service';

/**
 * Map of SeasonId -> ( EpisodeId -> Seen )
 */
export interface SeenMap {
  [key: number]: { [key: number]: boolean };
}

@Injectable({
  providedIn: 'root'
})
export class ShowSeenStatusService {

  private showToSubject: { [key: number]: BehaviorSubject<SeenMap>} = {};

  constructor(private api: ApiService, private userService: UserService) { }

  public getSeenStatus(showId: number): Observable<SeenMap> {
    if (this.showToSubject.hasOwnProperty(showId)) {
      return this.showToSubject[showId].asObservable();
    }

    const subject = this.showToSubject[showId] = new BehaviorSubject<SeenMap>({});
    if (this.userService.isShowUser()) {
      this.fetchSeenStatus(showId, subject);
    }

    return subject.asObservable();
  }

  private fetchSeenStatus(showId: number, subject: BehaviorSubject<SeenMap>) {
    this.api.get(`/shows/${showId}/seen-status`).subscribe((value: SeenMap) => {
      subject.next(value);
    });
  }

  public invalidateSeenStatus(showId: number) {
    if (this.showToSubject.hasOwnProperty(showId)) {
      this.fetchSeenStatus(showId, this.showToSubject[showId]);
    }
  }


}
