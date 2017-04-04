import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { MovieSummary } from "../../models/movie";
import { MovieListService } from "../../services/movie-list.service";
import { UserService } from "../../../core/services/user.service";
import { Subscription } from "rxjs";
import { LijstrException } from "../../../core/exceptions";

@Component({
  selector: 'lijstr-list-filter',
  templateUrl: './list-filter.component.html',
  styleUrls: ['./list-filter.component.css']
})
export class ListFilterComponent implements OnInit, OnChanges, OnDestroy {

  @Input() requestedUsers : number[];
  @Output() filtered = new EventEmitter<MovieSummary[]>();
  @Output() error = new EventEmitter<LijstrException>();

  private summaries : MovieSummary[];
  private filter : string;

  private wantToWatch : boolean;
  private wantToWatchMap : Map<number, number>;

  private listSubscription : Subscription;
  private userSubscription : Subscription;
  private isMovieUser : boolean;

  constructor(private userService : UserService,
              private listService : MovieListService) {
    this.requestedUsers = null;
  }

  ngOnInit() : void {
    this.isMovieUser = false;
    this.wantToWatch = false;
    this.wantToWatchMap = null;

    this.userSubscription = this.userService.userChangeFeed().subscribe(
      newUser => this.isMovieUser = this.userService.isMovieUser()
    );
  }

  ngOnChanges(changes : SimpleChanges) : void {
    console.log('lf-ngOnChanges');
    console.log(changes);
    if (this.requestedUsers == null) {
      return;
    }

    if (this.listSubscription != null) {
      this.listSubscription.unsubscribe();
    }

    console.log('lf-ngOnChanges-ru');
    const wot = new Date().getTime();
    this.listSubscription = this.listService.getSummaries(this.requestedUsers).subscribe(
      list => {
        console.log('lf-ngOnChanges-li-' + wot);
        this.summaries = list;
        this.applyFilters();
      },
      error => {
        this.error.emit(error);
      }
    );
  }

  ngOnDestroy() : void {
    this.userSubscription.unsubscribe();
    this.listSubscription.unsubscribe();
  }

  onFilter(value) {
    value = value.toLowerCase();
    this.filter = value;
    this.applyFilters();
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

  private applyFilters() {
    let result = this.summaries;

    //Apply the text filter (on title)
    let filter = this.filter;
    if (filter != null && filter.length > 0) {
      result = result.filter(function (d) {
        return d.title.toLowerCase().indexOf(filter) !== -1 || !filter;
      });
    }

    //Apply 'wantToWatch' movies
    if (this.wantToWatch && this.wantToWatchMap != null) {
      const map = this.wantToWatchMap;
      result = result.filter(function (d) {
        return map.has(d.id);
      });
    }

    this.filtered.emit(result);
  }


}
