import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';

export class OldSiteRating {
  rating: string;
  comment: string;
}

@Injectable()
export class OldSiteService {

  constructor(private http: HttpClient) {
  }

  /**
   * Get an old rating for a certain user.
   * @param oldSiteId The movie's ID on the old site
   * @param forUser The user's old username
   */
  getRating(oldSiteId: number, forUser: string): Observable<OldSiteRating> {
    const subject = new Subject<OldSiteRating>();
    this.http.get<OldSiteRating>('https://stoux.nl/film/json/ratings.php?id=' + oldSiteId)
      .pipe(finalize(() => subject.complete()))
      .subscribe(
        result => {
          subject.next(result[forUser]);
        },
        error => {
          subject.error(error);
        }
      );
    return subject.asObservable();
  }

}
