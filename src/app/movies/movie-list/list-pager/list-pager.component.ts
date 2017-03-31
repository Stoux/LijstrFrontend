import { Component, Input, OnInit } from "@angular/core";
import { MovieSummary } from "../../models/movie";
import { ListPagerSorting } from "./list-pager-sorting";
import { ListPagerKeys } from "./list-pager-keys";

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

  private keys : string[];
  private keyFoundAt : Map<string, number>;

  constructor() {
  }

  ngOnInit() {
    this.onProp = null;
    this.direction = null;
  }

  sort(rows : MovieSummary[]) : MovieSummary[] {
    if (this.onProp == null) {
      this.onProp = 'title';
      this.direction = 'asc';
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
    } else if (this.isUserRatingProp()) {
      result = ListPagerSorting.sortRowsForUser(rows, this.onProp, this.direction == 'asc');
    } else {
      result = rows;
    }

    this.buildKeys(result);
    return result;
  }

  onSort(onProp : string, direction : string, availableRows : MovieSummary[]) : MovieSummary[] {
    this.onProp = onProp;
    this.direction = direction;
    return this.sort(availableRows);
  }

  goToKey(key : string) {
    this.caller.goToRow(this.keyFoundAt.get(key));
  }

  private isNumberProp() : boolean {
    return this.onProp == 'year' || this.onProp == 'imdbRating'
      || this.onProp == 'metacriticScore' || this.onProp == 'runtime';
  }

  private isUserRatingProp() : boolean {
    return this.onProp.indexOf('latestRatings.') > -1;
  }


  private buildKeys(rows : MovieSummary[]) : void {
    this.keys = [];
    this.keyFoundAt = new Map<string, number>();

    let method : (movie : MovieSummary) => string;
    if (this.onProp == 'title') {
      method = ListPagerKeys.getTitleKey;
    } else if (this.isUserRatingProp()) {
      method = ListPagerKeys.getUserRatingKeyMethod(this.onProp);
    } else if (this.onProp == 'imdbRating') {
      method = ListPagerKeys.getImdbRatingKey;
    } else if (this.onProp == 'year') {
      method = ListPagerKeys.getYearKey;
    } else if (this.onProp == 'metacriticScore') {
      method = ListPagerKeys.getMetacriticScoreKey;
    } else {
      return;
    }

    for (let i = 0; i < rows.length; i++) {
      const movie = rows[i];
      const result = method.call(this, movie);
      if (result != null && !this.keyFoundAt.has(result)) {
        this.keys.push(result);
        this.keyFoundAt.set(result, i);
      }
    }
  }

}
