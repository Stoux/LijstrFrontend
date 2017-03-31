import { MovieSummary } from "../../models/movie";
import { ShortRating } from "../../models/ratings";

export class ListPagerKeys {

  public static getTitleKey(movie : MovieSummary) : string {
    const charCode = movie.title.toUpperCase().charCodeAt(0);
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

  public static getImdbRatingKey(movie : MovieSummary) : string {
    return ListPagerKeys.getRatingKey(movie.imdbRating);
  }

  public static getUserRatingKeyMethod(prop : string) : (movie : MovieSummary) => string {
    const user = prop.split('.')[1];
    return movie => {
      const rating : ShortRating = movie.latestRatings[user];
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

  public static getYearKey(movie : MovieSummary) : string {
    return movie.year.toString().substr(0, 3) + "0's";
  }

  public static getMetacriticScoreKey(movie : MovieSummary) : string {
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
