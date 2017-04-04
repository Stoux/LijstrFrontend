import { Injectable } from "@angular/core";
import { MovieSummary } from "../models/movie";
import { ApiService } from "../../core/services/api.service";
import { ReplaySubject, Observable, Subscription } from "rxjs";
import { MovieRatingsService } from "./movie-ratings.service";
import { RatingChange } from "../models/ratings";
import { Subject } from "rxjs/Subject";

@Injectable()
export class MovieListService {

  private request : Subscription;
  private hasMovies : boolean;
  private currentUsers : number[];
  private latestList : MovieSummary[];
  private heroesList : Subject<MovieSummary[]>;

  constructor(private api : ApiService,
              private ratingsService : MovieRatingsService) {
    this.heroesList = new Subject();
    this.hasMovies = false;
    this.currentUsers = [];

    this.ratingsService.changeFeed().subscribe(
      (change : RatingChange) => {
        let list = this.latestList;
        if (!list) {
          return; //Shouldn't happen but async
        }

        if (!(change.rating.user in this.currentUsers)) {
          return; //Nothing to update if the user isn't in the current list
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
   * Get all available movie summaries.
   * TODO: Add filtering options
   * @returns {Array} array of summaries
   */
  getSummaries(withUsers : number[]) : Observable<MovieSummary[]> {
    let response = this.heroesList.asObservable();
    if (this.sameUsers(withUsers) && (this.hasMovies || this.request != null)) {
      console.log('Returning same response');
      return response;
    }

    this.currentUsers = withUsers;
    let getRequest : Observable<MovieSummary[]> = this.api.get('/movies?users=' + withUsers.join(","));
    this.request = getRequest.finally(() => this.request = null).subscribe(
      summaries => {
        this.changeList(summaries);
        this.hasMovies = true;
      },
      error => {
        this.heroesList.error(error);
      }
    );

    return response;
  }

  /**
   * Get all the IDs of the movies the currently logged in user wants to see.
   * @returns {Observable<number>}
   */
  getWantToWatchMovies() : Observable<number[]> {
    return this.api.get('/movies/wantToWatch')
  }

  private changeList(list : MovieSummary[]) : void {
    console.log('Changing list');
    this.latestList = list;
    this.heroesList.next(list);
  }

  private sameUsers(users : number[]) {
    for (let user of users) {
      if (!(user in this.currentUsers)) {
        return false;
      }
    }
    for (let user of this.currentUsers) {
      if (!(user in users)) {
        return false;
      }
    }
    return true;
  }

}
