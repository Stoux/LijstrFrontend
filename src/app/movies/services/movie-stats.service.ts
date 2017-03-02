import { Injectable } from '@angular/core';
import { ApiService } from "../../core/services/api.service";
import { Observable } from "rxjs";
import { MovieStats } from "../models/movie-stats";
import { PageResult } from "../../core/models/common";
import { MovieSummary } from "../models/movie";

@Injectable()
export class MovieStatsService {

  constructor(private api : ApiService) { }

  /**
   * Fetch the movie stats.
   * @returns {Observable<MovieStats>}
   */
  getStats() : Observable<MovieStats> {
    return this.api.get('/movies/stats');
  }

  /**
   * Fetch a list of recently added movies.
   * @param page The page
   * @returns {Observable<PageResult<MovieSummary>>}
   */
  getRecentlyAdded(page : number = 1) : Observable<PageResult<MovieSummary>> {
    return this.api.get('/movies/stats/added?page=' + page);
  }

}
