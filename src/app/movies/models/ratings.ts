export enum Seen {
  YES = 0,
  NO = 1,
  UNKNOWN = 2
}

export class RatingChange {
  constructor(public movieId : number, public rating : ShortRating) {
  }
}

export class ShortRating {

  user : number;
  seen : Seen;
  rating : number;
  comment : string;

  static comparator(r1 : ShortRating, r2 : ShortRating) {
    //NOTE: They enter as empty strings instead of null values
    if (!r1 && !r2) {
      return 0;
    } else if (!r1 || !r2) {
      return !r1 ? -1 : 1;
    }

    if (r1.seen == r2.seen && r1.seen != Seen.YES) {
      return 0;
    } else if (r1.seen != r2.seen) {
      let s1 = r1.seen == Seen.NO ? 5 : r1.seen, //Move no to bottom, Yes > ? > No
        s2 = r2.seen == Seen.NO ? 5 : r2.seen;
      return s2 - s1; //Reverse result as best = lowest
    } else {
      //Different seen value
      let v1 = r1.rating == null ? 0 : r1.rating, //Move ?'s to the bottom by assigning them 0's
        v2 = r2.rating == null ? 0 : r2.rating;
      return v1 - v2;
    }
  }

  static copy(rating : ShortRating) : ShortRating {
    let r = new ShortRating();
    r.user = rating.user;
    r.seen = rating.seen;
    r.rating = rating.rating;
    r.comment = rating.comment == "" ? null : rating.comment;
    return r;
  }

}

export class MovieRating extends ShortRating {

  id : number;
  created : number;
  modified : number;
  lastest : boolean;

  static newRating() : MovieRating {
    let r = new MovieRating();
    r.id = null;
    r.seen = null;
    r.rating = null;
    r.comment = null;
    return r;
  }

}
