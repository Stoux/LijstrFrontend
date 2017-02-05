import { Injectable } from '@angular/core';
import { ShortRating, RatingChange, MovieRating } from "../models/ratings";
import { Subject, Observable } from "rxjs";
import { DataWrapper } from "../../core/models/common";
import { ApiService } from "../../core/services/api.service";

@Injectable()
export class MovieRatingsService {

  emitter : Subject<RatingChange>;

  constructor(private api : ApiService) {
    this.emitter = new Subject();
  }

  /**
   * Register a changed rating.
   * @param movieId ID of the movie
   * @param rating The rating
   */
  onChange(movieId : number, rating : ShortRating) {
    let copy = ShortRating.copy(rating);
    this.emitter.next(new RatingChange(movieId, copy));
  }

  /**
   * Get a feed of all future changes.
   * @returns {Observable<RatingChange>}
   */
  changeFeed() : Observable<RatingChange> {
    return this.emitter.asObservable();
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

  /**
   * Update an array of ratings after a change.
   * This either replaces the entry of the same user or pushes the new entry onto the end of the list.
   * @param ratings The current ratings
   * @param change The rating change
   */
  static updateRatingList(ratings : ShortRating[], change : RatingChange) {
    let found = false;
    ratings.every((value, index) => {
      if (value.user == change.rating.user) {
        ratings[index] = change.rating;
        found = true;
        return false; //Returning false stops the loop
      } else {
        return true;
      }
    });

    if (!found) {
      ratings.push(change.rating);
    }
  }

}
