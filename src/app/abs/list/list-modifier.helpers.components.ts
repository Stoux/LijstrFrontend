import { TargetSummary } from "../models/target";
import { Seen, ShortRating } from "../../shared/models/ratings";

export class ListPagerKeys {

  public static getTitleKey(target : TargetSummary<ShortRating>) : string {
    const charCode = target.title.toUpperCase().charCodeAt(0);
    if (charCode >= 48 && charCode <= 57) {
      return '0-9';
    } else if (charCode >= 65 && charCode <= 90) {
      return String.fromCharCode(charCode);
    } else if (charCode <= 127) {
      return '*';
    } else {
      return null;
    }
  }

  public static getImdbRatingKey(target : TargetSummary<ShortRating>) : string {
    return ListPagerKeys.getRatingKey(target.imdbRating);
  }

  public static getUserRatingKeyMethod(prop : string) : (target : TargetSummary<ShortRating>) => string {
    const user = prop.split('.')[1];
    return target => {
      const rating : ShortRating = target.latestRatings[user];
      if (rating == null) {
        return 'N/A';
      }

      switch (rating.seen) {
        case 0: //Yes
          return ListPagerKeys.getRatingKey(rating.rating, '?');

        case 1: //No
          return "Nee";

        default:
        case 2:
          return "Ja?";
      }
    };
  }

  public static getMetacriticScoreKey(movie : TargetSummary<ShortRating>) : string {
    const mc = movie.metacriticScore;
    if (mc == null) {
      return 'N/A';
    } else if (mc == 100) {
      return '100';
    } else if (mc < 10) {
      return "0's";
    } else {
      return mc.toString().substr(0, 1) + "0's";
    }
  }

  private static getRatingKey(rating : number, nullValue : string = 'N/A') : string {
    if (rating == null) {
      return nullValue;
    } else if (rating == 10) {
      return "10";
    } else {
      return Math.floor(rating) + '.x';
    }
  }


}

export class ListPagerSorting {

  /**
   * Sort the rows using a given sort method.
   * @param rows The rows
   * @param sortMethod The sort method
   * @param prop The property to sort on
   * @param reversed Should reverse the results
   * @returns Item[] the sorted list
   */
  public static  sortRows<Item extends TargetSummary<ShortRating>>(rows : Item[],
                                                                   sortMethod : (a : Item, b : Item, prop : string, reversed : boolean) => number,
                                                                   prop : string,
                                                                   reversed : boolean) : Item[] {
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
   * @returns Item[] the sorted list
   */
  public static sortRowsForUser<Item extends TargetSummary<ShortRating>>(rows : Item[], prop : string, reversed : boolean) : Item[] {
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
  public static titleSort<Item extends TargetSummary<ShortRating>>(a : Item, b : Item, prop? : string, reversed : boolean = false) : number {
    return a.title.localeCompare(b.title) * (reversed ? -1 : 1);
  }

  //Method to sort on a number property
  public static numberSort<Item extends TargetSummary<ShortRating>>(a : Item, b : Item, prop : string, reversed) : number {
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

  //TODO: Add Seen.TELEVISION
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
