import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Observable } from 'rxjs';
import { MovieStats, MovieChange } from '../models/movie-stats';
import { PageResult } from '../../core/models/common';
import { MovieSummary } from '../models/movie';
import { MovieRating } from '../models/ratings';
import { MovieComment } from '../models/timeline';

@Injectable()
export class MovieStatsService {

  constructor(private api: ApiService) {
  }

  /**
   * Fetch the movie stats.
   */
  getStats(): Observable<MovieStats> {
    return this.api.get('/movies/stats');
  }

  /**
   * Fetch a list of recently added movies.
   * @param page The page
   */
  getRecentlyAdded(page: number = 1): Observable<PageResult<MovieSummary>> {
    return this.api.get('/movies/stats/added?page=' + page);
  }

  /**
   * Fetch a list of new ratings.
   * @param page The page
   */
  getNewRatings(page: number = 1): Observable<PageResult<MovieChange<MovieRating>>> {
    return this.api.get('/movies/stats/newRatings?page=' + page);
  }

  /**
   * Fetch a list of new comments.
   * @param page The page
   */
  getNewComments(page: number = 1): Observable<PageResult<MovieChange<MovieComment>>> {
    return this.api.get('/movies/stats/newComments?page=' + page);
  }

}
