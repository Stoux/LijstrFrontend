import { Component, OnInit } from '@angular/core';
import { MovieStatsService } from '../services/movie-stats.service';
import { MovieStats, MovieUserStats } from '../models/movie-stats';
import { LijstrException } from '../../core/exceptions';
import { MovieUsersService } from '../services/movie-users.service';
import { User } from '../../core/models/user';
import { PageResult } from '../../core/models/common';
import { Observable } from 'rxjs';

export class UserWrapper {
  constructor(public user: string, public stats: MovieUserStats) {
  }
}

@Component({
  selector: 'lijstr-movie-stats',
  templateUrl: './movie-stats.component.html',
  styleUrls: ['./movie-stats.component.css']
})
export class MovieStatsComponent implements OnInit {

  constructor(private statsService: MovieStatsService,
              private movieUsersService: MovieUsersService) { }

  keys = ['filledIn', 'seen', 'notSeen', 'noIdea', 'unknownRating', 'withComment'];

  stats: MovieStats;
  userStats: UserWrapper[];
  lazyStats: string[];
  ceilings: Map<string, any>;
  error: LijstrException;

  users: User[];

  recentlyAddedFunc = (page: number): Observable<PageResult<any>> =>
    this.statsService.getRecentlyAdded(page)
  newRatingsFunc = (page: number): Observable<PageResult<any>> =>
    this.statsService.getNewRatings(page)
  newCommentsFunc = (page: number): Observable<PageResult<any>> =>
    this.statsService.getNewComments(page)

  ngOnInit() {
    this.statsService.getStats().subscribe(
      stats => {
        this.stats = stats;
        this.setup();
      },
      error => this.error = error
    );

    this.movieUsersService.getPromisedUsers().subscribe(
      users => {
        this.users = users;
        this.setup();
      }
    );
  }

  getClassesForKey(key: string, userWrapper: UserWrapper) {
    const ceilings = this.ceilings.get(key);
    const value = userWrapper.stats[key];
    return {
      danger: ceilings.low == value,
      success: ceilings.high == value && key != 'filledIn'
    };
  }

  private setup() {
    if (this.stats == null || this.users == null) {
      return;
    }

    this.userStats = [];
    this.lazyStats = [];
    for (const user of this.users) {
      if (user.id in this.stats.userToStats) {
        const statValue: MovieUserStats = this.stats.userToStats[user.id];
        if (statValue.filledIn == 0) {
          this.lazyStats.push(user.displayName);
        } else {
          this.userStats.push(new UserWrapper(user.displayName, statValue));
        }
      }
    }

    this.ceilings = new Map();
    for (const key of this.keys) {
      this.determineCeilings(key);
    }
    this.determineCeilings('averageRating');
  }

  private determineCeilings(key: string) {
    let lowest = Number.MAX_SAFE_INTEGER;
    let highest = Number.MIN_SAFE_INTEGER;

    for (const w of this.userStats) {
      const stat = w.stats[key];
      if (stat < lowest) {
        lowest = stat;
      }
      if (stat > highest) {
        highest = stat;
      }
    }

    this.ceilings.set(key, {low : lowest, high : highest});
  }


}
