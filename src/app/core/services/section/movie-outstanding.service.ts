import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { UserService } from '../user.service';
import { LijstrException } from '../../exceptions';
import { MovieDetail } from '../../../movies/models/movie';
import {map} from 'rxjs/operators';

@Injectable()
export class MovieOutstandingService {

  private outstandingMovies: number;
  private feed: Subject<number>;

  constructor(private apiService: ApiService,
              private userService: UserService) {
    this.feed = new BehaviorSubject(null);

    this.userService.userChangeFeed().subscribe(
      user => {
        if (user == null) {
          this.next(null);
        } else {
          if (this.userService.isMovieUser()) {
            this.recount();
          }
        }
      }
    );
  }

  /**
   * Get the current number of movies that still need to be filled in for the current number.
   * Returns a NULL value if there's no data or if there's no user.
   */
  public getOutstandingCount(): Observable<number> {
    return this.feed.asObservable();
  }

  /**
   * Get all outstanding movies for the current user.
   */
  public getOutstanding(): Observable<MovieDetail[]> {
    return this.apiService.get('/movies/outstanding')
      .pipe(map((movies: MovieDetail[]) => {
        this.next(movies.length);
        return movies;
      }));
  }

  /**
   * Preform a recount (using the server) of the current number of oustanding movies.
   */
  public recount(): void {
    this.apiService.get('/movies/outstanding/count').subscribe(
      (result: any) => this.next(result.total),
      (error: LijstrException) => {
        this.next(null); // Shouldn't happen..
        console.log('Failed to fetch count: ' + error.toString());
      }
    );
  }

  /**
   * Increase the current number of outstanding movies.
   */
  public increase(): void {
    if (this.outstandingMovies != null) {
      this.next(++this.outstandingMovies);
    }
  }

  /**
   * Decrease the current number of outstanding movies.
   */
  public decrease(): void {
    if (this.outstandingMovies != null && (this.outstandingMovies - 1) >= 0) {
      this.next(--this.outstandingMovies);
    }
  }

  private next(count: number): void {
    this.outstandingMovies = count;
    this.feed.next(count);
  }

}
