import { Component, OnInit } from '@angular/core';
import { ColumnMode, SelectionType, TableColumn } from '@swimlane/ngx-datatable';
import { ShowSummary } from '../models/show';
import { ShowListService } from '../services/show-list.service';

@Component({
  selector: 'lijstr-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.css']
})
export class ShowListComponent implements OnInit {

  public readonly columnMode = ColumnMode.flex;
  public readonly selectionType = SelectionType.single;

  public columns: ShowListColumn[] = [
    { name: 'Titel', prop: 'title', isPlain: true, flexGrow: 4 },
    // { name: 'IMDB', prop: 'imdbRating', isRating: true },
    { name: 'TMDB', prop: 'tmdbRating', isRating: true },
    { name: 'Start', prop: 'startYear', isPlain: true },
    { name: 'Einde', prop: 'endYear', isPlain: true },
    // { name: 'Status', prop: 'status', isPlain: true },
    // { name: 'Type', prop: 'type', isPlain: true },
    // { name: 'Seasons', prop: 'seasons', isPlain: true },
    // { name: 'Episodes', prop: 'episodes', isPlain: true },
    // { name: 'Volg. episode', prop: 'nextEpisode', isDate: true },
  ];
  public summaries: ShowSummary[] = [];

  constructor(private api: ShowListService) { }

  ngOnInit(): void {
    this.api.getSummaries().subscribe(summaries => this.summaries = summaries);
  }

}

/**
 * Describes a column in the list.
 * Make sure to pass a true value to <strong>one</strong> of the is**** properties.
 */
export interface ShowListColumn {
  name: string;
  prop: string;
  flexGrow?: number;

  // Type
  isPlain?: boolean;
  isDate?: boolean;
  isRating?: boolean;
  isUser?: boolean;
}
