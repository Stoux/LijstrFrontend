import { Component, Input, OnInit } from "@angular/core";
import { MovieSummary } from "../../models/movie";
import { Seen, ShortRating } from "../../models/ratings";
import { ListPagerSorting } from "./list-pager-sorting";

export interface RowCaller {
  goToRow(row : number) : void;
}

@Component({
  selector: 'lijstr-list-pager',
  templateUrl: './list-pager.component.html',
  styleUrls: ['./list-pager.component.css']
})
export class ListPagerComponent implements OnInit {

  @Input() caller : RowCaller;

  private onProp : string;
  private direction : string;

  constructor() {
  }

  ngOnInit() {

  }

  sort(rows : MovieSummary[]) : MovieSummary[] {
    if (this.onProp == null) {
      return rows;
    }

    let result;
    if (this.onProp == 'title') {
      result = ListPagerSorting.sortRows(
        rows, ListPagerSorting.titleSort, this.onProp, this.direction == 'desc'
      );
    } else if (this.isNumberProp()) {
      result = ListPagerSorting.sortRows(
        rows, ListPagerSorting.numberSort, this.onProp, this.direction == 'asc'
      );
    } else if (this.onProp.indexOf('latestRatings.') > -1) {
      result = ListPagerSorting.sortRowsForUser(rows, this.onProp, this.direction == 'asc');
    } else {
      result = rows;
    }

    return result;
  }

  onSort(onProp : string, direction : string, availableRows : MovieSummary[]) : MovieSummary[] {
    this.onProp = onProp;
    this.direction = direction;
    return this.sort(availableRows);
  }

  private isNumberProp() : boolean {
    return this.onProp == 'year' || this.onProp == 'imdbRating'
      || this.onProp == 'metacriticScore' || this.onProp == 'runtime';
  }



}
