import { Injectable } from "@angular/core";
import { ApiService } from "../../core/services/api.service";
import { Observable } from "rxjs";
import { MovieDetail, MovieUserMeta } from "../models/movie";
import { DataWrapper } from "../../core/models/common";
import { ExtendedRating } from "../../shared/models/ratings";
import { MovieComment } from "../models/timeline";
import { Response } from "@angular/http";

@Injectable()
export class MovieDetailService {

  constructor(private api : ApiService) {
  }

  /**
   * Get the details of a movie.
   * @param id The movie's ID
   * @returns {Observable<MovieDetail>}
   */
  getMovieDetail(id : number) : Observable<MovieDetail> {
    return this.api.get('/movies/' + id);
  }

  /**
   * Get a timeline for a movie.
   * @param id The ID of the movie
   * @returns {Observable<(ExtendedRating|MovieComment)[]>} ordered array of ratings and comments
   */
  getMovieTimeline(id : number) : Observable<(ExtendedRating|MovieComment)[]> {
    return this.api.get('/movies/' + id + '/timeline?includeRatings=false')
      .map((items : any[]) => {
        let result : (ExtendedRating|MovieComment)[] = [];
        for (let item of items) {
          if ('seen' in item) {
            result.push(new ExtendedRating().fromJSON(item));
          } else {
            result.push(new MovieComment().fromJSON(item));
          }
        }
        return result;
      });
  }

  /**
   * Get the meta data a user has for a movie.
   * @param movieId The movie id
   * @returns {Observable<MovieUserMeta>}
   */
  getMovieUserMeta(movieId : number) : Observable<MovieUserMeta> {
    return this.api.get('/movies/' + movieId + '/meta');
  }

  /**
   * Save a user's meta data for a given movie.
   * @param movieId The movie id
   * @param meta The new metadata
   * @returns {Observable<Response>}
   */
  saveMovieUserMeta(movieId : number, meta : MovieUserMeta) : Observable<Response> {
    return this.api.put('/movies/' + movieId + '/meta', meta);
  }

  /**
   * Post a new comment on a movie.
   * @param movieId The movie ID
   * @param comment The comment
   * @returns {Observable<any>} ID of the comment
   */
  placeComment(movieId : number, comment : string) : Observable<any> {
    return this.api.post('/movies/' + movieId + '/comments', {'comment' : comment});
  }

}
