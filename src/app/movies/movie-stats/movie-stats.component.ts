import { Component, OnInit } from "@angular/core";
import { MovieStatsService } from "../services/movie-stats.service";
import { MovieStats, MovieUserStats } from "../models/movie-stats";
import { LijstrException } from "../../core/exceptions";
import { MovieUsersService } from "../services/movie-users.service";
import { User } from "../../core/models/user";

export class UserWrapper {
  constructor(public user : string, public stats : MovieUserStats) {
  }
}

@Component({
  selector: 'lijstr-movie-stats',
  templateUrl: './movie-stats.component.html',
  styleUrls: ['./movie-stats.component.css']
})
export class MovieStatsComponent implements OnInit {

  keys = ["filledIn", "seen", "notSeen", "noIdea", "unknownRating", "withComment"];

  stats : MovieStats;
  userStats : UserWrapper[];
  lazyStats : string[];
  ceilings : Map<string, any>;
  error : LijstrException;

  users : User[];

  constructor(private statsService : MovieStatsService,
              private movieUsersService : MovieUsersService) { }

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

  getClassesForKey(key : string, userWrapper : UserWrapper) {
    const ceilings = this.ceilings.get(key);
    const value = userWrapper.stats[key];
    return {
      'lowest': ceilings['low'] == value,
      'highest': ceilings['high'] == value
    }
  }

  private setup() {
    if (this.stats == null || this.users == null) {
      return;
    }

    this.userStats = [];
    this.lazyStats = [];
    for (let user of this.users) {
      if (user.id in this.stats.userToStats) {
        const statValue : MovieUserStats = this.stats.userToStats[user.id];
        if (statValue.filledIn == 0) {
          this.lazyStats.push(user.displayName);
        } else {
          this.userStats.push(new UserWrapper(user.displayName, statValue));
        }
      }
    }

    this.ceilings = new Map();
    for (let key of this.keys) {
      this.determineCeilings(key);
    }
    this.determineCeilings("averageRating");
  }

  private determineCeilings(key : string) {
    let lowest = Number.MAX_SAFE_INTEGER;
    let highest = Number.MIN_SAFE_INTEGER;

    for (let w of this.userStats) {
      let stat = w.stats[key];
      if (stat < lowest) {
        lowest = stat;
      }
      if (stat > highest) {
        highest = stat;
      }
    }

    this.ceilings.set(key, {'low' : lowest, 'high' : highest});
  }


}
