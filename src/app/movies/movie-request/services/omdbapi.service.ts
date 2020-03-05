import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import { LijstrException } from '../../../core/exceptions';
import { ApiService } from '../../../core/services/api.service';

export class OmdbObject {

  imdbId: string;
  title: string;
  year: string;
  released: string;
  runtime: string;
  imdbRating: string;
  imdbVotes: string;
  type: string;
  plot: string;
  poster: string;
  response: string;
  error: string;

}

@Injectable()
export class OmdbApiService {

  constructor(private api: ApiService) {
  }

  private static handleResponse(result: any): any {
    if (result.type != 'movie') {
      return throwError(LijstrException.forErrorMessage(400, 'Niet een film.'));
    }

    return result;
  }

  /**
   * Get a movie.
   * @param imdbId The IMDB id
   * @returns {Observable<OmdbObject>}
   */
  getMovie(imdbId: string): Observable<OmdbObject> {
    return this.api.get<OmdbObject>('/omdb/' + imdbId)
      .pipe(OmdbApiService.handleResponse);
  }

}
