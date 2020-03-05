import { Injectable } from '@angular/core';
import { MovieSummary } from '../models/movie';
import { ApiService } from '../../core/services/api.service';
import { ReplaySubject, Observable, Subscription } from 'rxjs';
import { MovieRatingsService } from './movie-ratings.service';
import { RatingChange } from '../models/ratings';
import {finalize} from 'rxjs/operators';

@Injectable()
export class MovieListService {

  private request: Subscription;
  private hasMovies: boolean;
  private latestList: MovieSummary[];
  private heroesList: ReplaySubject<MovieSummary[]>;

  constructor(private api: ApiService,
              private ratingsService: MovieRatingsService) {
    this.heroesList = new ReplaySubject(1);
    this.hasMovies = false;

    this.ratingsService.changeFeed().subscribe(
      (change: RatingChange) => {
        const list = this.latestList;
        if (!list) {
          return; // Shouldn't happen but async
        }

        // Find the movie and update the ratings
        for (const movie of list) {
          if (movie.id == change.movieId) {
            movie.latestRatings[change.rating.user] = change.rating;
            this.changeList(list.slice()); // Create new array ref to trigger udpates
            break;
          }
        }
      }
    );
  }

  /**
   * Get all available movie summaries.
   * TODO: Modify to return observable
   * TODO: Add filtering options
   * TODO: Add sorting options
   * @returns {Array} array of summaries
   */
  getSummaries(forceFetch: boolean = false): Observable<MovieSummary[]> {
    const response = this.heroesList.asObservable();
    if ((this.hasMovies && !forceFetch) || this.request != null) {
      return response;
    }

    const getRequest: Observable<MovieSummary[]> = this.api.get('/movies?includeGenres=true&includeLanguages=true');
    this.request = getRequest.pipe(finalize(() => this.request = null)).subscribe(
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
   */
  getWantToWatchMovies(): Observable<number[]> {
    return this.api.get('/movies/wantToWatch');
  }

  private changeList(list: MovieSummary[]): void {
    this.latestList = list;
    this.heroesList.next(list);
  }

}
