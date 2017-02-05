import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MovieDetail } from "../models/movie";
import { environment } from "../../../environments/environment";
import { FullUser, User } from "../../core/models/user";
import { Subscription } from "rxjs";
import { UserService } from "../../core/services/user.service";
import { MovieUsersService } from "../services/movie-users.service";

@Component({
  selector: 'lijstr-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit, OnDestroy {

  movie : MovieDetail;

  userSubscription : Subscription;
  loggedInUser : FullUser;
  isMovieUser : boolean;

  shortPlot : boolean;

  movieUsers : User[];

  constructor(private userService : UserService,
              private movieUsersService : MovieUsersService,
              private route : ActivatedRoute) {

    this.shortPlot = true;
    this.isMovieUser = false;
  }

  ngOnInit() {
    //Subscribe to the route and get the pre-fetched movie from it.
    this.route.data.subscribe(
      (data : {movieDetail : MovieDetail}) => {
        this.movie = data.movieDetail;
      }
    );

    //Also keep track on user changes to show modify options.
    this.userSubscription = this.userService.userChangeFeed().subscribe(
      user => {
        this.loggedInUser = user;
        this.isMovieUser = this.userService.isMovieUser();
      }
    );
    
    this.movieUsersService.getPromisedUsers().subscribe(
      users => this.movieUsers = users
    );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  getPosterURL() : string {
    return "http" + (environment.endpointSSL ? "s" : "") + "://" + environment.endpoint +
      "/movies/" + this.movie.id + "/poster";
  }

  switchPlotSize() {
    this.shortPlot = !this.shortPlot;
  }


  get debug() {
    return JSON.stringify(this.movie, null, 2);
  }

}
