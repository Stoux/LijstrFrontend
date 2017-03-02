import { Component, OnInit } from '@angular/core';
import { MovieStatsService } from "../../services/movie-stats.service";
import { MovieSummary } from "../../models/movie";
import { LijstrException } from "../../../core/exceptions";
import { MovieUsersService } from "../../services/movie-users.service";
import { User } from "../../../core/models/user";

@Component({
  selector: 'lijstr-recently-added',
  templateUrl: './recently-added.component.html',
  styleUrls: ['./recently-added.component.css']
})
export class RecentlyAddedComponent implements OnInit {

  results : MovieSummary[];
  currentPage : number;
  loading : boolean;
  hasNextPage : boolean;
  error : LijstrException;

  users : User[];

  constructor(private statsService : MovieStatsService,
              private movieUsersService : MovieUsersService) { }

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

  private fetchPage(page : number) {
    this.loading = true;
    this.hasNextPage = false;
    this.statsService.getRecentlyAdded(page).finally(() => this.loading = false).subscribe(
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
