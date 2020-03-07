import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ListExtendedFilterComponent, MovieListFilter, SelectItem} from '../list-extended-filter.component';
import {MoviePeopleFetcher} from '../../../services/movie-people.service';
import {MovieSummary} from '../../../models/movie';
import {concat, Observable, of, Subject} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'lijstr-list-person-filter',
  templateUrl: './list-person-filter.component.html',
  styleUrls: ['./list-person-filter.component.css']
})
export class ListPersonFilterComponent implements OnInit, MovieListFilter {

  readonly minCharacters = 2;

  @Output() updated = new EventEmitter<void>();
  @Input() label: string;
  @Input() multiple: boolean;
  @Input() peopleFetcher: MoviePeopleFetcher;
  people?: Observable<SelectItem[]>;
  // Map of [Person ID] => { [MovieID] => [Movie Title] }
  byPeople?: {[key: number]: { [key: number]: string }};
  placeholder: string;
  selected: SelectItem|SelectItem[];
  searchInput = new Subject<string>();
  loading = false;

  constructor() { }

  private get selectedArray(): SelectItem[] {
    if (!this.selected || (this.selected && Array.isArray(this.selected) && this.selected.length === 0)) {
      return null;
    } else if (!Array.isArray(this.selected)) {
      return [ this.selected ];
    } else {
      return this.selected as SelectItem[];
    }
  }

  private get isLoadingPeople(): boolean {
    if (!this.byPeople) {
      return false;
    }

    for (const value of Object.values(this.byPeople)) {
      if (value === null) {
        return true;
      }
    }

    return false;
  }

  ngOnInit(): void {
    this.people = concat(
      of([]),
      this.searchInput.pipe(
        distinctUntilChanged(),
        tap(() => this.loading = true),
        debounceTime(250),
        switchMap(term => {
          if (!term || term.length < this.minCharacters) {
            this.loading = false;
            return of([]);
          }

          return this.peopleFetcher.get(term).pipe(
            tap(() => this.loading = false),
            catchError(() => of([])),
            map(ListExtendedFilterComponent.toSelectFormat)
          );
        })
      )
    );

    this.people.subscribe((data) => {
      console.log('Data', data);
    });
  }

  onSelected() {
    // Reset the byPeople
    const oldByPeople = this.byPeople;
    this.byPeople = null;

    // Check if any value was passed
    const selectedArray = this.selectedArray;
    if (!selectedArray) {
      this.onUpdate();
      return;
    }

    // Check which data has to be (re)fetched
    this.byPeople = {};
    for (const person of Object.values(selectedArray)) {
      if (oldByPeople && oldByPeople.hasOwnProperty(person.id)) {
        this.byPeople[person.id] = oldByPeople[person.id];
      } else {
        this.byPeople[person.id] = null;
        this.peopleFetcher.getByPerson(person.id).subscribe(data => {
          if (this.byPeople.hasOwnProperty(person.id)) {
            this.byPeople[person.id] = data;
            this.onUpdate();
          }
        });
      }
    }

    this.onUpdate();
  }

  private onUpdate() {
    this.updated.emit();
  }

  trackById(item: SelectItem) {
    return item.id;
  }

  filter(summaries: MovieSummary[]): MovieSummary[] {
    // Don't do anything if nothing is selected yet.
    const selectedItems = this.selectedArray;
    if (!selectedItems) {
      return summaries;
    }

    // Check if still loading
    if (this.isLoadingPeople) {
      return [];
    }

    // Filter summaries by selected items
    return summaries.filter(summary => {
      // If any of the persons has this movie we allow it
      for (const byPerson of Object.values(this.byPeople)) {
        if (byPerson.hasOwnProperty(summary.id)) {
          return true;
        }
      }

      return false;
    });
  }

}
