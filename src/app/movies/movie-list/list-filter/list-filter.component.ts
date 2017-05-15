import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { MovieSummary } from "../../models/movie";
import { MovieListService } from "../../services/movie-list.service";
import { UserService } from "../../../core/services/user.service";
import { Subscription } from "rxjs";
import { LijstrException } from "../../../core/exceptions";
import { AbstractListFilter } from "../../../abs/list/list-modifier.components";
import { User } from "../../../core/models/user";

@Component({
  selector: 'lijstr-list-filter',
  templateUrl: './list-filter.component.html',
  styleUrls: ['./list-filter.component.css']
})
export class ListFilterComponent extends AbstractListFilter<MovieSummary, MovieListService> {

  private wantToWatch : boolean;
  private wantToWatchMap : Map<number, number>;

  constructor(userService : UserService,
              listService : MovieListService) {
    super(userService, listService);
  }

  ngOnInit() : void {
    super.ngOnInit();
    this.wantToWatch = false;
    this.wantToWatchMap = null;
  }


  protected isTargetUser(newUser : User) : boolean {
    return this.userService.isMovieUser();
  }

  toggleWantToWatch() {
    this.wantToWatch = !this.wantToWatch;
    if (this.wantToWatch && this.wantToWatchMap == null) {
      this.listService.getWantToWatchMovies().subscribe(
        movies => {
          this.wantToWatchMap = new Map();
          for (let movie of movies) {
            this.wantToWatchMap.set(movie, movie);
          }
          this.applyFilters();
        },
        error => {
          this.error.emit(error);
        }
      );
    } else {
      this.applyFilters();
    }
  }


  protected applyExtraFilters(result : MovieSummary[]) : MovieSummary[] {
    //Apply 'wantToWatch' movies
    if (this.wantToWatch && this.wantToWatchMap != null) {
      const map = this.wantToWatchMap;
      return result.filter(function (d) {
        return map.has(d.id);
      });
    }
    return result;
  }
}
