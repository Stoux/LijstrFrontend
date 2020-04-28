import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { MovieCollection } from '../models/movie-collections';

@Injectable({
  providedIn: 'root'
})
export class MovieCollectionsService {

  constructor(private api: ApiService) { }

  /**
   * Fetch a collection by it's ID.
   */
  get(id: number): Observable<MovieCollection> {
    return this.api.get(`/movies/collections/${id}`);
  }

  /**
   * Fetch the available collections
   * @param query Optional filter on title & keywords
   */
  list(query?: string): Observable<{ [key: number]: string }> {
    return this.api.get('/movies/collections/', true, query ? { query } : null );
  }

  /**
   * Add a new collection
   */
  add(collection: MovieCollection): Observable<MovieCollection> {
    return this.api.post('/movies/collections/', collection);
  }

  /**
   * Update a collection using it's ID.
   */
  update(collection: MovieCollection): Observable<MovieCollection> {
    return this.api.put(`/movies/collections/${collection.id}`, collection);
  }

}
