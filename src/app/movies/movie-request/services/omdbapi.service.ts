import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LijstrException } from '../../../core/exceptions';
import { ApiService } from '../../../core/services/api.service';
import { map } from 'rxjs/operators';

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

export interface OmdbSearchResult {

  imdbId: string;
  title: string;
  year: string;
  type: string;
  poster: string;

  // Custom label set by us.
  label?: string;

}

@Injectable()
export class OmdbApiService {

  constructor(private api: ApiService) {
  }

  private static handleResponse(result: any): any {
    if (result.type !== 'movie') {
      throw LijstrException.forErrorMessage(400, 'Niet een film.');
    }

    return result;
  }

  /**
   * Get a movie.
   * @param imdbId The IMDB id
   */
  getMovie(imdbId: string): Observable<OmdbObject> {
    return this.api.get<OmdbObject>('/omdb/' + imdbId)
      .pipe(map(OmdbApiService.handleResponse));
  }

  /**
   * Search movies with the given title query.
   * @param query movie title containing query
   */
  searchMovies(query: string): Observable<OmdbSearchResult[]> {
    return this.api.get('/omdb/search', true, {
      query
    });
  }


}
