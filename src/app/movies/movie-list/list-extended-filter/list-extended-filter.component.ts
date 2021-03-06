import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ImdbService} from '../../../shared/services/imdb.service';
import {MovieSummary} from '../../models/movie';
import {MoviePeopleService} from '../../services/movie-people.service';
import {ListPersonFilterComponent} from './list-person-filter/list-person-filter.component';

@Component({
  selector: 'lijstr-list-extended-filter',
  templateUrl: './list-extended-filter.component.html',
  styleUrls: ['./list-extended-filter.component.css']
})
export class ListExtendedFilterComponent implements OnInit {

  constructor(private imdbService: ImdbService,
              public peopleService: MoviePeopleService) {
    this.loading = false;
  }

  @Output() filtered = new EventEmitter<MovieSummary[]>();

  active: boolean;
  private summaries: MovieSummary[];
  private loading: boolean;

  languages: SelectItem[];
  availableLanguages: SelectItem[];
  selectedLanguages: SelectItem[];
  languagesPlaceholder: string;

  genres: SelectItem[];
  availableGenres: SelectItem[];
  selectedGenres: SelectItem[];
  genresPlaceholder: string;

  @ViewChild('writerFilter') writerFilter: ListPersonFilterComponent;
  @ViewChild('directorFilter') directorFilter: ListPersonFilterComponent;
  @ViewChild('actorFilter') actorFilter: ListPersonFilterComponent;

  public static toSelectFormat(map: { [key: number]: string }): SelectItem[] {
    const result: SelectItem[] = [];
    for (const key in map) {
      if (map.hasOwnProperty(key)) {
        result.push(new SelectItem(key, map[key]));
      }
    }
    result.sort((a, b) => {
      const lcA = a.text.toLowerCase();
      const lcB = b.text.toLowerCase();

      if (lcA < lcB) {
        return -1;
      } else if (lcA > lcB) {
        return 1;
      } else {
        return 0;
      }
    });

    return result;
  }

  ngOnInit() {
    this.genres = null;
    this.selectedGenres = [];
    this.availableGenres = [];
    this.genresPlaceholder = 'Laden...';

    this.languages = null;
    this.selectedLanguages = [];
    this.availableLanguages = [];
    this.languagesPlaceholder = 'Laden...';
  }

  onNewList(summaries: MovieSummary[]): MovieSummary[] {
    this.summaries = summaries; // Save the original list
    if (!this.active) {
      return summaries;
    }
    return this.filter(summaries);
  }

  emitChange() {
    this.filtered.emit(this.filter(this.summaries));
  }

  private filter(summaries: MovieSummary[]): MovieSummary[] {
    let result = summaries;

    const filters: MovieListFilter[] = [ this.writerFilter, this.directorFilter, this.actorFilter ];
    for (const filter of filters) {
      result = filter.filter(result);
    }

    // Go through the filters
    result = this.applyFilter(result, this.selectedGenres, s => s.genres);
    result = this.applyFilter(result, this.selectedLanguages, s => s.languages);

    // Set available options
    this.setAvailable(
      result, this.genres, s => s.genres,
      options => this.availableGenres = options
    );

    this.setAvailable(
      result, this.languages, s => s.languages,
        options => this.availableLanguages = options
    );

    return result;
  }

  private applyFilter(summaries: MovieSummary[],
                      selected: SelectItem[],
                      getSummaryMap: (s: MovieSummary) => any): MovieSummary[] {
    if (selected.length === 0) {
      return summaries;
    }

    // Filter out all that don't have all required
    return summaries.filter(summary => {
      const items = getSummaryMap(summary);
      for (const item of selected) {
        if (!(item.id in items)) {
          return false;
        }
      }

      return true;
    });
  }

  private setAvailable(summaries,
                       allOptions: SelectItem[],
                       getSummaryMap: (s: MovieSummary) => any,
                       setMethod: (options: SelectItem[]) => void) {
    const available = new Map();
    for (const summary of summaries) {
      const items = getSummaryMap(summary);
      for (const key in items) {
        if (items.hasOwnProperty(key)) {
          available.set(key, true);
        }
      }
    }

    // Set available
    setMethod(allOptions.filter(item => available.has(item.id)));
  }

  setEnabled(active: boolean): void {
    this.active = active;

    if (active) {
      if (this.genres === null && !this.loading) {
        // Load the data
        this.loading = true;

        this.imdbService.getGenres().subscribe(
          data => {
            this.genres = ListExtendedFilterComponent.toSelectFormat(data);
            this.availableGenres = this.genres;
            this.genresPlaceholder = '';
          },
          error => {
            this.genresPlaceholder = 'Laden mislukt.';
          }
        );
        this.imdbService.getLanguages().subscribe(
          data => {
            this.languages = ListExtendedFilterComponent.toSelectFormat(data);
            this.availableLanguages = this.languages;
            this.languagesPlaceholder = '';
          },
          error => {
            this.languagesPlaceholder = 'Laden mislukt.';
          }
        );

      } else if (this.hasSelectedItems()) {
        // Reapply the filters
        this.emitChange();

      }
    }

    if (!active && this.hasSelectedItems()) {
      // Reset the list
      this.filtered.emit(this.summaries);
    }
  }

  private hasSelectedItems(): boolean {
    return this.selectedLanguages.length !== 0 || this.selectedGenres.length !== 0;
  }

}

export class SelectItem {
  constructor(public id: string, public text: string) { }
}

export interface MovieListFilter {

  /**
   * Filter out any movies.
   * @param summaries The movies
   */
  filter(summaries: MovieSummary[]): MovieSummary[];

}
