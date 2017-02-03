export enum Seen {
  YES = 0,
  NO = 1,
  UNKNOWN = 2
}

export class ShortRating {

  user : number;
  seen : Seen;
  rating : number;
  comment : string;

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
