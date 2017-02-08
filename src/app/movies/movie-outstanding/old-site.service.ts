import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import { Observable, Subject } from "rxjs";

export class OldSiteRating {
  rating : string;
  comment : string;
}

@Injectable()
export class OldSiteService {

  constructor(private http : Http) {
  }

  /**
   * Get an old rating for a certain user.
   * @param oldSiteId The movie's ID on the old site
   * @param forUser The user's old username
   * @returns {Observable<OldSiteRating>}
   */
  getRating(oldSiteId : number, forUser : string) : Observable<OldSiteRating> {
    let ro = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'Allow-Control-Allow-Origin': 'stoux.nl'
      })
    });

    let subject = new Subject<OldSiteRating>();
    this.http.get('https://stoux.nl/film/json/ratings.php?id=' + oldSiteId)
      .finally(() => subject.complete())
      .subscribe(
        result => {
          let json = result.json();
          subject.next(json[forUser]);
        },
        error => {
          subject.error(error);
        }
      );
    return subject.asObservable();
  }

}
