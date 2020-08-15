import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieDetail } from '../models/movie';
import { FullUser, User } from '../../core/models/user';
import { Subscription } from 'rxjs';
import { UserService } from '../../core/services/user.service';
import { MovieUsersService } from '../services/movie-users.service';
import { RatingChange } from '../models/ratings';
import { MovieRatingsService } from '../services/movie-ratings.service';

@Component({
  selector: 'lijstr-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit, OnDestroy {

  movie: MovieDetail;

  loggedInUser: FullUser;
  isMovieUser: boolean;

  movieUsers: User[];

  private userSubscription: Subscription;
  private ratingsSubscription: Subscription;

  constructor(private userService: UserService,
              private movieUsersService: MovieUsersService,
              private movieRatingsService: MovieRatingsService,
              private route: ActivatedRoute) {

    this.isMovieUser = false;
  }

  ngOnInit() {
    // Subscribe to the route and get the pre-fetched movie from it.
    this.route.data.subscribe(
      (data: {movieDetail: MovieDetail}) => {
        this.movie = data.movieDetail;
      }
    );

    // Also keep track on user changes to show modify options.
    this.userSubscription = this.userService.userChangeFeed().subscribe(
      user => {
        this.loggedInUser = user;
        this.isMovieUser = this.userService.isMovieUser();
      }
    );

    this.movieUsersService.getPromisedUsers().subscribe(
      users => this.movieUsers = users
    );

    // Keep track of rating changes
    this.ratingsSubscription = this.movieRatingsService.changeFeed().subscribe(
      (change: RatingChange) => {
        if (this.movie != null && this.movie.id == change.movieId) {
          MovieRatingsService.updateRatingList(this.movie.latestMovieRatings, change);
          // Change the array ref to trigger a change
          this.movie.latestMovieRatings = this.movie.latestMovieRatings.slice();
        }
      }
    );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.ratingsSubscription.unsubscribe();
  }

}
