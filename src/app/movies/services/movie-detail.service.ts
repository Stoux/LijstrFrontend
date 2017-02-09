import { Injectable } from "@angular/core";
import { ApiService } from "../../core/services/api.service";
import { Observable } from "rxjs";
import { MovieDetail, MovieUserMeta } from "../models/movie";
import { DataWrapper } from "../../core/models/common";
import { MovieRating } from "../models/ratings";
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
   * @returns {Observable<(MovieRating|MovieComment)[]>} ordered array of ratings and comments
   */
  getMovieTimeline(id : number) : Observable<(MovieRating|MovieComment)[]> {
    return this.api.get('/movies/' + id + '/timeline')
      .map((items : any[]) => {
        console.log(items);
        let result : (MovieRating|MovieComment)[] = [];
        for (let item of items) {
          if ('seen' in item) {
            result.push(new MovieRating().fromJSON(item));
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

}
