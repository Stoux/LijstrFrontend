import { Input, OnInit } from "@angular/core";
import { TargetSummary } from "../models/target";
import { ShortRating } from "../../shared/models/ratings";
import { ListPagerKeys, ListPagerSorting } from "./list-modifier.helpers.components";

export interface RowCaller {
  goToRow(row : number) : void;
}

export abstract class AbstractListPager<Item extends TargetSummary<ShortRating>> implements OnInit {

  @Input() caller : RowCaller;

  protected curProp : string;
  protected curDirection : string;

  keys : string[];
  protected keyFoundAt : Map<string, number>;

  ngOnInit() : void {
    this.curProp = null;
    this.curDirection = null;
  }

  sort(rows : Item[]) : Item[] {
    if (this.curProp == null) {
      this.curProp = 'title';
      this.curDirection = 'asc';
    }

    let result;
    if (this.curProp == 'title') {
      result = ListPagerSorting.sortRows(
        rows, ListPagerSorting.titleSort, this.curProp, this.curDirection == 'desc'
      );
    } else if (this.isNumberProp()) {
      result = ListPagerSorting.sortRows(
        rows, ListPagerSorting.numberSort, this.curProp, this.curDirection == 'asc'
      );
    } else if (this.isUserRatingProp()) {
      result = ListPagerSorting.sortRowsForUser(rows, this.curProp, this.curDirection == 'asc');
    } else {
      result = rows;
    }

    this.buildKeys(result);
    return result;
  }

  onSort(prop : string, direction : string, availableRows : Item[]) : Item[] {
    this.curProp = prop;
    this.curDirection = direction;
    return this.sort(availableRows);
  }

  goToKey(key : string) {
    this.caller.goToRow(this.keyFoundAt.get(key));
  }

  /**
   * Check whether the current sorting property is a number.
   * @returns {boolean}
   */
  protected isNumberProp() : boolean {
    return this.curProp == 'year' || this.curProp == 'imdbRating'
      || this.curProp == 'metacriticScore' || this.curProp == 'runtime';
  }

  /**
   * Check whether the current sorting property is a user's ratings.
   * @returns {boolean}
   */
  protected isUserRatingProp() : boolean {
    return this.curProp.indexOf('latestMovieRatings.') > -1;
  }

  private buildKeys(rows : Item[]) : void {
    this.keys = [];
    this.keyFoundAt = new Map<string, number>();


    let method : (item : Item) => string;
    if (this.curProp == 'title') {
      method = ListPagerKeys.getTitleKey;
    } else if (this.isUserRatingProp()) {
      method = ListPagerKeys.getUserRatingKeyMethod(this.curProp);
    } else if (this.curProp == 'imdbRating') {
      method = ListPagerKeys.getImdbRatingKey;
    } else if (this.curProp == 'metacriticScore') {
      method = ListPagerKeys.getMetacriticScoreKey;
    } else {
      method = this.getKeyMethod(this.curProp);
      if (method == null) {
        return;
      }
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

  /**
   * Get the key method for a certain prop.
   * @param forProp The current property
   */
  protected abstract getKeyMethod(forProp : string) : (item : Item) => string;


}
