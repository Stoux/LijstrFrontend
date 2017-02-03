import { Injectable } from "@angular/core";
import { ApiService } from "../../core/services/api.service";
import { Observable } from "rxjs";
import { MovieDetail } from "../models/movie";
import { DataWrapper } from "../../core/models/common";
import { MovieRating } from "../models/ratings";

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
   * Get the latest rating a user gave for a movie.
   * @param movieId The movie's ID
   * @returns {Observable<DataWrapper<MovieRating>>} wrapped rating
   */
  getLatestMovieRatingForUser(movieId : number) : Observable<DataWrapper<MovieRating>> {
    return this.api.get('/movies/' + movieId + '/ratings/latest/');
  }

  /**
   * Add a rating for the given movie.
   * @param movieId The movie's ID
   * @param rating The rating
   * @returns {Observable<MovieRating>}
   */
  addRating(movieId : number, rating : MovieRating) : Observable<MovieRating> {
    return this.api.post('/movies/' + movieId + '/ratings', rating);
  }

  /**
   * Edit an existing rating.
   * WARNING: This has to be done in the time-frame where the backend allows modifications.
   * @param movieId The movie's ID
   * @param rating The rating
   * @returns {Observable<MovieRating>}
   */
  editRating(movieId : number, rating : MovieRating) : Observable<MovieRating> {
    return this.api.put('/movies/' + movieId + '/ratings/' + rating.id, rating);
  }

}
