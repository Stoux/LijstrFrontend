import { Injectable } from "@angular/core";
import { MovieSummary } from "../models/movie";
import { ApiService } from "../../core/services/api.service";
import { ReplaySubject, Observable, Subscription } from "rxjs";
import { MovieRatingsService } from "./movie-ratings.service";
import { RatingChange } from "../../shared/models/ratings";
import { AbsSummaryService } from "../../abs/services/target.services";

@Injectable()
export class MovieListService extends AbsSummaryService<MovieSummary> {

  constructor(api : ApiService,
              private ratingsService : MovieRatingsService) {
    super(api, 'movies');

    this.ratingsService.changeFeed().subscribe(
      (change : RatingChange) => {
        let list = this.latestList;
        if (!list) {
          return; //Shouldn't happen but async
        }

        //Find the movie and update the ratings
        for (let movie of list) {
          if (movie.id == change.movieId) {
            movie.latestRatings[change.rating.user] = change.rating;
            this.changeList(list.slice()); //Create new array ref to trigger udpates
            break;
          }
        }
      }
    );
  }


  /**
   * Get all the IDs of the movies the currently logged in user wants to see.
   * @returns {Observable<number>}
   */
  getWantToWatchMovies() : Observable<number[]> {
    return this.api.get('/movies/wantToWatch')
  }

}
