import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { MovieRequest, SavedMovieRequest, AddMoviePayload } from '../models/requests';
import { Observable } from 'rxjs';
import {HttpResponse} from '@angular/common/http';

@Injectable()
export class MovieRequestService {

  constructor(private api: ApiService) {
  }

  /**
   * Get a list of all outstanding requests.
   */
  getOutstandingRequests(): Observable<SavedMovieRequest[]> {
    return this.api.get('/movies/requests');
  }

  /**
   * Request a new movie.
   * @param request The request
   * @returns no result, only response
   */
  requestMovie(request: MovieRequest): Observable<HttpResponse<any>> {
    return this.api.post('/movies/requests', request);
  }

  /**
   * Approve a request.
   * This requires MOD permissions.
   * @param id The request's ID
   */
  approveRequest(id: number): Observable<HttpResponse<any>> {
    return this.api.post('/movies/requests/' + id + '/approve');
  }

  /**
   * Add a new movie.
   * This requires MOD permissions.
   * @param request The request
   */
  addMovie(request: AddMoviePayload): Observable<HttpResponse<any>> {
    return this.api.post('/movies', request);
  }

}
