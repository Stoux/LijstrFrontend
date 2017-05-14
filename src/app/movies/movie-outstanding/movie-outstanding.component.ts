import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieOutstandingService } from "../../core/services/section/movie-outstanding.service";
import { MovieDetail } from "../models/movie";
import { LijstrException } from "../../core/exceptions";
import { FullUser, User } from "../../core/models/user";
import { UserService } from "../../core/services/user.service";
import { Subscription } from "rxjs";
import { MovieRating } from "../../shared/models/ratings";
import { OldSiteService, OldSiteRating } from "./old-site.service";
import { MovieUsersService } from "../services/movie-users.service";

@Component({
  selector: 'lijstr-movie-outstanding',
  templateUrl: './movie-outstanding.component.html',
  styleUrls: ['./movie-outstanding.component.css']
})
export class MovieOutstandingComponent implements OnInit, OnDestroy {

  movies : MovieDetail[];
  moviesRemaining : number;
  currentIndex : number;
  currentMovie : MovieDetail;
  error : LijstrException;

  oldSiteRating : OldSiteRating;
  oldSiteError : any;

  availableUsers : User[];
  currentUser : FullUser;
  userSub : Subscription;

  constructor(private userService : UserService,
              private movieUsersService : MovieUsersService,
              private outstandingService : MovieOutstandingService,
              private oldSiteService : OldSiteService) {
    this.movies = null;
    this.moviesRemaining = 0;
    this.currentIndex = -1;
  }

  ngOnInit() {
    this.outstandingService.getOutstanding().subscribe(
      movies => {
        this.movies = movies;
        this.moviesRemaining = movies.length;
        this.next();
      },
      error => this.error = error
    );
    this.userSub = this.userService.userChangeFeed().subscribe(
      user => this.currentUser = user
    );
    this.movieUsersService.getPromisedUsers().subscribe(
      users => this.availableUsers = users
    );
  }

  ngOnDestroy() : void {
    this.userSub.unsubscribe();
  }

  onNext(newRating : MovieRating) : void {
    this.moviesRemaining--;
    if (this.moviesRemaining > 0) {
      this.next();
    }
  }

  private next() {
    this.oldSiteRating = null;
    this.oldSiteError = null;

    this.currentIndex++;
    this.currentMovie = this.movies[this.currentIndex];
    if (this.currentUser.oldSiteUser != null && this.currentMovie.oldSiteId != null) {
      const forMovie = this.currentMovie;
      this.oldSiteService.getRating(forMovie.oldSiteId, this.currentUser.oldSiteUser).subscribe(
        rating => {
          if (forMovie == this.currentMovie) {
            this.oldSiteRating = rating
          }
        },
        error => this.oldSiteError = error
      );
    }
  }


}
