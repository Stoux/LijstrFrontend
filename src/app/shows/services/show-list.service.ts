import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Observable, ReplaySubject } from 'rxjs';
import { ShowSummary } from '../models/show';
import { MovieSummary } from '../../movies/models/movie';

@Injectable({
  providedIn: 'root'
})
export class ShowListService {

  // TODO: Caching

  constructor(private api: ApiService) {

  }

  /**
   * Get a list of summaries from the API.
   */
  getSummaries(): Observable<ShowSummary[]> {
    return this.api.get('/shows/');
  }

}
