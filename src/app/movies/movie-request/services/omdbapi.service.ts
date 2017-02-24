import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs";
import { LijstrException } from "../../../core/exceptions";

export class OmdbObject {
  constructor(public imdbId : string,
              public title : string,
              public year : string,
              public plot : string,
              public posterUrl : string) {
  }
}

@Injectable()
export class OmdbApiService {

  constructor(private http : Http) {
  }

  /**
   * Get a movie.
   * @param imdbId The IMDB id
   * @returns {Observable<OmdbObject>}
   */
  getMovie(imdbId : string) : Observable<OmdbObject> {
    return this.http.get('https://www.omdbapi.com/?i=' + imdbId + '&plot=short&r=json')
      .map(OmdbApiService.handleResponse)
      .catch(OmdbApiService.handleError);
  }

  private static handleResponse(response : Response) : any {
    if (response.text()) {
      let result = response.json();
      if (result['Response'] == 'True') {
        if (result['Type'] != 'movie') {
          return LijstrException.forErrorMessage(400, 'Niet een film.');
        }

        return new OmdbObject(
          result['imdbID'], result['Title'], result['Year'],
          result['Plot'], result['Poster']
        );
      }
    }

    return LijstrException.forErrorMessage(404, 'Niet gevonden.');
  }

  private static handleError(error : any) {
    console.log(error);
    let exception = LijstrException.forErrorMessage(500, 'Er is iets mis gegaan...');
    return Observable.throw(exception);
  }

}
