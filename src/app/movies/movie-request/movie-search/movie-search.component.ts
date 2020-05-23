import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { concat, Observable, of, Subject } from 'rxjs';
import { OmdbApiService, OmdbSearchResult } from '../services/omdbapi.service';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'lijstr-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {

  @Output() searchResult = new EventEmitter<OmdbSearchResult>();
  results?: Observable<OmdbSearchResult[]>;
  searchInput = new Subject<string>();
  loading = false;

  constructor(private api: OmdbApiService) { }

  ngOnInit(): void {
    this.results = concat(
      of([]),
      this.searchInput.pipe(
        distinctUntilChanged(),
        tap(() => this.loading = true),
        debounceTime(500),
        switchMap(query => {
          if (!query || query.length <= 1) {
            this.loading = false;
            return of([]);
          }

          return this.api.searchMovies(query).pipe(
            tap(() => this.loading = false),
            tap(results => {
              results.forEach(result => {
                result.label = `${result.title} (${result.year})`;
              });
            }),
            catchError(() => of([]))
          );
        })
      )
    );
  }

  onSelected(selected: OmdbSearchResult) {
    console.log('Selected', selected);
    this.searchResult.emit(selected);
  }

  trackByImdbId(item: OmdbSearchResult) {
    return item.imdbId;
  }

}
