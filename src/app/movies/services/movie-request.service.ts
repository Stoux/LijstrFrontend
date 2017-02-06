import { Injectable } from "@angular/core";
import { ApiService } from "../../core/services/api.service";
import { MovieRequest, SavedMovieRequest, AddMoviePayload } from "../models/requests";
import { Observable } from "rxjs";
import { Response } from "@angular/http";

@Injectable()
export class MovieRequestService {

  constructor(private api : ApiService) {
  }

  /**
   * Get a list of all outstanding requests.
   * @returns {Observable<MovieRequest[]>}
   */
  getOutstandingRequests() : Observable<SavedMovieRequest[]> {
    return this.api.get('/movies/requests');
  }

  /**
   * Request a new movie.
   * @param request The request
   * @returns {Observable<Response>} no result, only response
   */
  requestMovie(request : MovieRequest) : Observable<Response> {
    return this.api.post('/movies/requests', request);
  }

  /**
   * Approve a request.
   * This requires MOD permissions.
   * @param id The request's ID
   * @returns {Observable<Response>}
   */
  approveRequest(id : number) : Observable<Response> {
    return this.api.post('/movies/requests/' + id + '/approve');
  }

  /**
   * Add a new movie.
   * This requires MOD permissions.
   * @param request The request
   * @returns {Observable<Response>}
   */
  addMovie(request : AddMoviePayload) : Observable<Response> {
    return this.api.post('/movies', request);
  }

}
