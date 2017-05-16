import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MovieDetail } from "../models/movie";
import { FullUser, User } from "../../core/models/user";
import { Subscription } from "rxjs";
import { UserService } from "../../core/services/user.service";
import { MovieUsersService } from "../services/movie-users.service";
import { RatingChange } from "../../shared/models/ratings";
import { MovieRatingsService } from "../services/movie-ratings.service";
import { TargetDetailComponent } from "../../abs/detail/target-detail.component";

@Component({
  selector: 'lijstr-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent extends TargetDetailComponent<MovieDetail, MovieUsersService> {

  private ratingsSubscription : Subscription;

  constructor(userService : UserService,
              movieUsersService : MovieUsersService,
              private movieRatingsService : MovieRatingsService,
              route : ActivatedRoute) {
    super(userService, movieUsersService, route);
  }

  ngOnInit() {
    super.ngOnInit();
    //Keep track of rating changes
    this.ratingsSubscription = this.movieRatingsService.changeFeed().subscribe(
      (change : RatingChange) => {
        if (this.target != null && this.target.id == change.movieId) {
          MovieRatingsService.updateRatingList(this.target.latestMovieRatings, change);
          //Change the array ref to trigger a change
          this.target.latestMovieRatings = this.target.latestMovieRatings.slice();
        }
      }
    );
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.ratingsSubscription.unsubscribe();
  }

  protected checkTargetUser(user : FullUser) : boolean {
    return this.userService.isMovieUser();
  }

}
