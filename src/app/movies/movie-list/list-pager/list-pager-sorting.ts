import { MovieSummary } from "../../models/movie";
import { Seen, ShortRating } from "../../models/ratings";

export class ListPagerSorting {

  /**
   * Sort the rows using a given sort method.
   * @param rows The rows
   * @param sortMethod The sort method
   * @param prop The property to sort on
   * @param reversed Should reverse the results
   * @returns MovieSummary[] the sorted list
   */
  public static sortRows(rows : MovieSummary[],
                         sortMethod : (a : MovieSummary, b : MovieSummary, prop : string, reversed : boolean) => number,
                         prop : string,
                         reversed : boolean) : MovieSummary[] {
    return [...rows].sort(
      (a, b) => sortMethod(a, b, prop, reversed)
    );
  }

  /**
   * Sort the rows for a certain user using their lastRating.
   *
   * @param rows The rows
   * @param prop The property (must be format 'lastRatings.[number]')
   * @param reversed Should reverse the order
   * @returns MovieSummary[] the sorted list
   */
  public static sortRowsForUser(rows : MovieSummary[], prop : string, reversed : boolean) : MovieSummary[] {
    const user = prop.split('.')[1];
    return [...rows].sort(
      (a, b) => {
        const r1 = a.latestRatings[user];
        const r2 = b.latestRatings[user];
        const result = ListPagerSorting.ratingSort(r1, r2, reversed);
        if (result === 0) {
          return ListPagerSorting.titleSort(a, b);
        } else {
          return result;
        }
      }
    );
  }

  //Method to sort on titles
  public static titleSort(a : MovieSummary, b : MovieSummary, prop? : string, reversed : boolean = false) {
    return a.title.localeCompare(b.title) * (reversed ? -1 : 1);
  }

  //Method to sort on a number property
  public static numberSort(a : MovieSummary, b : MovieSummary, prop : string, reversed) : number {
    const valA : number = a[prop];
    const valB : number = b[prop];

    if ((valA == null && valB == null) || valA === valB) {
      return ListPagerSorting.titleSort(a, b);
    } else if (valA == null || valB == null) {
      return valA == null ? 1 : -1;
    } else {
      return (valA - valB) * (reversed ? -1 : 1);
    }
  }

  //Force a order of: Ratings (reversible) -> ? Rating -> ? Seen -> Not seen -> N/A
  private static ratingSort(r1 : ShortRating, r2 : ShortRating, reversed : boolean) : number {
    let result;
    if (r1 == null && r2 == null) {
      return 0;
    } else if (r1 == null || r2 == null) {
      return r1 == null ? 1 : -1;
    } else {
      if (r1.seen == r2.seen && r1.seen != Seen.YES) {
        return 0;
      } else if (r1.seen != r2.seen) {
        let s1 = r1.seen == Seen.NO ? 5 : r1.seen, //Move no to bottom, Yes > ? > No
          s2 = r2.seen == Seen.NO ? 5 : r2.seen;
        return s1 - s2; //Reverse result as best = lowest
      } else {
        if (r1.rating == null && r2.rating == null) {
          return 0;
        } else if (r1.rating == null || r2.rating == null) {
          return r1.rating == null ? 1 : -1;
        }

        result = r1.rating - r2.rating;
      }
    }

    return result * (reversed ? -1 : 1);
  }


}
