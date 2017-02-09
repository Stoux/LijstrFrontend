import { Injectable } from '@angular/core';
import { ShortRating, RatingChange, MovieRating, Seen } from "../models/ratings";
import { Subject, Observable } from "rxjs";
import { DataWrapper } from "../../core/models/common";
import { ApiService } from "../../core/services/api.service";
import { DecimalPipe } from "@angular/common";

@Injectable()
export class MovieRatingsService {

  emitter : Subject<RatingChange>;

  private numberPipe : DecimalPipe;

  constructor(private api : ApiService) {
    this.emitter = new Subject();
    this.numberPipe = new DecimalPipe('en-US');
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


  /**
   * Get the short text version of  a rating.
   * @param shortRating the rating
   * @returns {string}
   */
  public shortRatingText(shortRating : ShortRating) : string {
    if (!shortRating) {
      return 'Nog niet ingevuld';
    } else if (shortRating.seen == Seen.NO) {
      return 'Niet gezien';
    } else if (shortRating.seen == Seen.YES) {
      return this.ratingValueText(shortRating.rating);
    } else {
      return 'Not sure if gezien';
    }
  }

  /**
   * Get the long text version of a rating.
   * @param shortRating the rating
   * @returns {string}
   */
  public longRatingText(shortRating : ShortRating) : string {
    if (!shortRating) {
      return 'heeft nog niks ingevuld.';
    } else if (shortRating.seen == Seen.NO) {
      return 'heeft de film nog niet gezien.'
    } else if (shortRating.seen == Seen.YES) {
      return 'heeft de film gezien | ' + this.ratingValueText(shortRating.rating);
    } else {
      //TODO: Add gender?
      return 'weet niet meer hij/zij de film heeft gezien.';
    }
  }

  private ratingValueText(value : number) {
    let valueAsText;
    if (value == null) {
      valueAsText = '?';
    } else {
      valueAsText = this.numberPipe.transform(value, '1.1-1');
    }
    return 'Rating: ' + valueAsText + '/10';
  }


}
