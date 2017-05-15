import { Component } from "@angular/core";
import { MovieSummary } from "../../models/movie";
import { AbstractListPager } from "../../../abs/list/pager/list-pager.component";

@Component({
  selector: 'lijstr-movie-list-pager',
  templateUrl: '../../../abs/list/pager/list-pager.component.html',
  styleUrls: ['../../../abs/list/pager/list-pager.component.css']
})
export class MovieListPagerComponent extends AbstractListPager<MovieSummary> {

  protected getKeyMethod(forProp : string) : (item : MovieSummary) => string {
    if (forProp == 'year') {
      return MovieListPagerComponent.getYearKey;
    }
    return null;
  }

  private static getYearKey(movie : MovieSummary) : string {
    return movie.year.toString().substr(0, 3) + "0's";
  }

}
