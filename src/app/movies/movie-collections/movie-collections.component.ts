import { Component, OnInit } from '@angular/core';
import { MovieListService } from '../services/movie-list.service';
import { MovieCollectionsService } from '../services/movie-collections.service';
import { MovieCollection } from '../models/movie-collections';
import { MovieSummary } from '../models/movie';
import { concat, Observable, of, Subject } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'lijstr-movie-collections',
  templateUrl: './movie-collections.component.html',
  styleUrls: ['./movie-collections.component.css']
})
export class MovieCollectionsComponent implements OnInit {

  public readonly minSearchLength = 3;

  public loading: boolean;
  public submitting: boolean;
  public collection: MovieCollection;

  public selectedCollection?: { id: number, title: string };
  public availableCollections: { id: number, title: string }[];

  public availableMovies: MovieSummary[];
  public filteredMovies: Observable<MovieSummary[]>;
  public movieSearchInput: Subject<string>;
  public selectedMovies: MovieSummary[];

  constructor(private listService: MovieListService,
              private collectionsService: MovieCollectionsService) {
    this.submitting = false;
    this.loading = false;
    this.collection = null;
    this.movieSearchInput = new Subject();
  }

  ngOnInit(): void {
    this.collectionsService.list().subscribe(idToTitles => {
      const result: { id: number, title: string }[] = [];
      for (const id in idToTitles) {
        if (idToTitles.hasOwnProperty(id)) {
          result.push({
            id: parseInt(id, 10),
            title: idToTitles[id],
          });
        }
      }

      this.availableCollections = result;
    });

    this.listService.getSummaries().subscribe(summaries => this.availableMovies = summaries.map(summary => {
      // Copy to new objects to prevent modifying the main table
      const newSummary = new MovieSummary(`${summary.title} (${summary.year})`);
      newSummary.id = summary.id;
      return newSummary;
    }));

    this.filteredMovies = concat(
      of([]),
      this.movieSearchInput.pipe(
        distinctUntilChanged(),
        switchMap(term => {
          if (!term || term.length < this.minSearchLength) {
            return of([]);
          }

          const lcTerm = term.toLowerCase();
          return of(this.availableMovies.filter(summary => summary.title.toLowerCase().includes(lcTerm)));
        })
      )
    );
  }

  onSubmit(): void {
    this.submitting = true;
    (this.collection.id ? this.collectionsService.update(this.collection) : this.collectionsService.add(this.collection)).toPromise()
      .then(collection => {
        this.collection = collection;
        this.submitting = false;
      })
      .catch(error => {
        this.submitting = false;
      });
  }

  onNewCollection(): void {
    this.collection = new MovieCollection();
    this.selectedMovies = [];
  }

  modifyCollection(): void {
    this.loading = true;
    this.collectionsService.get(this.selectedCollection.id).subscribe(collection => {
      this.collection = collection;
      this.loading = false;
      this.selectedMovies = this.availableMovies.filter(movie => collection.movieIds.indexOf(movie.id) >= 0);
    });
  }

  cancel(): void {
    this.collection = null;
  }

  onMoviesSelected(): void {
    this.collection.movieIds = this.selectedMovies.map(summary => summary.id);
  }

  trackById(summary: MovieSummary) {
    return summary.id;
  }

}
