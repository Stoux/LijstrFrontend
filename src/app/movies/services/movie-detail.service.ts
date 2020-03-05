import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Observable } from 'rxjs';
import { MovieDetail, MovieUserMeta } from '../models/movie';
import { MovieRating } from '../models/ratings';
import { MovieComment } from '../models/timeline';
import {map} from 'rxjs/operators';
import {HttpResponse} from '@angular/common/http';

@Injectable()
export class MovieDetailService {

  constructor(private api: ApiService) {
  }

  /**
   * Get the details of a movie.
   * @param id The movie's ID
   */
  getMovieDetail(id: number): Observable<MovieDetail> {
    return this.api.get('/movies/' + id);
  }

  /**
   * Get a timeline for a movie.
   * @param id The ID of the movie
   * @returns ordered array of ratings and comments
   */
  getMovieTimeline(id: number): Observable<(MovieRating|MovieComment)[]> {
    return this.api.get('/movies/' + id + '/timeline?includeRatings=false')
      .pipe(map((items: any[]) => {
        const result: (MovieRating|MovieComment)[] = [];
        for (const item of items) {
          if ('seen' in item) {
            result.push(new MovieRating().fromJSON(item));
          } else {
            result.push(new MovieComment().fromJSON(item));
          }
        }
        return result;
      }));
  }

  /**
   * Get the meta data a user has for a movie.
   * @param movieId The movie id
   */
  getMovieUserMeta(movieId: number): Observable<MovieUserMeta> {
    return this.api.get('/movies/' + movieId + '/meta');
  }

  /**
   * Save a user's meta data for a given movie.
   * @param movieId The movie id
   * @param meta The new metadata
   */
  saveMovieUserMeta(movieId: number, meta: MovieUserMeta): Observable<HttpResponse<any>> {
    return this.api.put('/movies/' + movieId + '/meta', meta);
  }

  /**
   * Post a new comment on a movie.
   * @param movieId The movie ID
   * @param comment The comment
   * @returns ID of the comment
   */
  placeComment(movieId: number, comment: string): Observable<HttpResponse<any>> {
    return this.api.post('/movies/' + movieId + '/comments', {comment});
  }

}
