import { Component, OnInit, Input } from "@angular/core";
import { LijstrException } from "../../../core/exceptions";
import { MovieUsersService } from "../../services/movie-users.service";
import { User } from "../../../core/models/user";
import { PageResult } from "../../../core/models/common";
import { Observable } from "rxjs";
import { MovieRatingsService } from "../../services/movie-ratings.service";
import { MovieChange } from "../../models/movie-stats";
import { ExtendedRating, UserRating } from "../../../shared/models/ratings";
import { MovieComment } from "../../models/timeline";

@Component({
  selector: 'lijstr-recently-changed',
  templateUrl: 'recently-changed.component.html',
  styleUrls: ['recently-changed.component.css']
})
export class RecentlyChangedComponent implements OnInit {

  @Input() title : string;
  @Input() fetchFunction : (page : number) => Observable<PageResult<any>>;

  results : any[];
  currentPage : number;
  loading : boolean;
  hasNextPage : boolean;
  error : LijstrException;

  users : User[];

  constructor(private ratingsService : MovieRatingsService,
              private movieUsersService : MovieUsersService) {
  }

  ngOnInit() {
    this.results = [];
    this.loading = false;
    this.hasNextPage = false;
    this.currentPage = 1;
    this.movieUsersService.getPromisedUsers().subscribe(users => this.users = users);
    this.fetchPage(this.currentPage);
  }

  fetchNextPage() {
    if (this.hasNextPage) {
      this.currentPage++;
      this.fetchPage(this.currentPage);
    }
  }

  toUserRating(ratingChange : MovieChange<ExtendedRating>) : UserRating {
    return new UserRating(
      this.fetchUserName(ratingChange),
      ratingChange.change
    );
  }

  fetchUserName(anyChange : MovieChange<ExtendedRating|MovieComment>) : string {
    let user = MovieUsersService.findUser(anyChange.change.user, this.users);
    return user == null ? 'N/A' : user.displayName;
  }

  private fetchPage(page : number) {
    this.loading = true;
    this.hasNextPage = false;
    const call : Observable<PageResult<any>> = this.fetchFunction.call(this, page);
    call.finally(() => this.loading = false).subscribe(
      result => {
        this.results = this.results.concat(result.result);
        if (result.page < result.totalPages) {
          this.hasNextPage = true;
        }
      },
      error => this.error = error
    );
  }

}
