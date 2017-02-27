import { Injectable } from '@angular/core';
import { ApiService } from "../../core/services/api.service";
import { Observable } from "rxjs";
import { MovieStats } from "../models/movie-stats";

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

}
