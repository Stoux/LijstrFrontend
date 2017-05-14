import { Component } from "@angular/core";
import { MovieSummary } from "../../models/movie";
import { AbstractListPager } from "../../../abs/list/list-modifier.components";

@Component({
  selector: 'lijstr-list-pager',
  templateUrl: './list-pager.component.html',
  styleUrls: ['./list-pager.component.css']
})
export class ListPagerComponent extends AbstractListPager<MovieSummary> {

  protected getKeyMethod(forProp : string) : (item : MovieSummary) => string {
    if (forProp == 'year') {
      return ListPagerComponent.getYearKey;
    }
    return null;
  }

  private static getYearKey(movie : MovieSummary) : string {
    return movie.year.toString().substr(0, 3) + "0's";
  }

}
