import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { MovieSummary } from '../../models/movie';
import { MovieListService } from '../../services/movie-list.service';
import { UserService } from '../../../core/services/user.service';
import { Subscription } from 'rxjs';
import { LijstrException } from '../../../core/exceptions';

@Component({
  selector: 'lijstr-list-filter',
  templateUrl: './list-filter.component.html',
  styleUrls: ['./list-filter.component.css']
})
export class ListFilterComponent implements OnInit, OnDestroy {

  @Output() filtered = new EventEmitter<MovieSummary[]>();
  @Output() error = new EventEmitter<LijstrException>();

  summaries: MovieSummary[];
  private filter: string;

  public wantToWatch: boolean;
  public wantToWatchMap: Map<number, number>;

  private listSubscription: Subscription;
  private userSubscription: Subscription;
  isMovieUser: boolean;

  constructor(private userService: UserService,
              private listService: MovieListService) { }

  ngOnInit(): void {
    this.isMovieUser = false;
    this.wantToWatch = false;
    this.wantToWatchMap = null;

    this.userSubscription = this.userService.userChangeFeed().subscribe(
      newUser => this.isMovieUser = this.userService.isMovieUser()
    );

    this.listSubscription = this.listService.getSummaries().subscribe(
      list => {
        this.summaries = list;
        this.applyFilters();
      },
      error => {
        this.error.emit(error);
      }
    );
  }

  ngOnDestroy(): void {
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
          for (const movie of movies) {
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

    // Apply the text filter (on title)
    const filter = this.filter;
    if (filter != null && filter.length > 0) {
      result = result.filter(d => {
        return d.title.toLowerCase().indexOf(filter) !== -1 || !filter;
      });
    }

    // Apply 'wantToWatch' movies
    if (this.wantToWatch && this.wantToWatchMap != null) {
      const map = this.wantToWatchMap;
      result = result.filter(d => {
        return map.has(d.id);
      });
    }

    this.filtered.emit(result);
  }


}
