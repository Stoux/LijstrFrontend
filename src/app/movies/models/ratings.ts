import { Serializable } from '../../core/models/common';

export enum Seen {
  YES = 0,
  NO = 1,
  UNKNOWN = 2
}

export class RatingChange {
  constructor(public movieId: number, public rating: ShortRating) {
  }
}

export class ShortRating extends Serializable {

  user: number;
  seen: Seen;
  rating: number;
  comment: string;

  static copy(rating: ShortRating): ShortRating {
    const r = new ShortRating();
    r.user = rating.user;
    r.seen = rating.seen;
    r.rating = rating.rating;
    r.comment = rating.comment == '' ? null : rating.comment;
    return r;
  }

}

export class MovieRating extends ShortRating {

  id: number;
  created: number;
  lastModified: number;
  latest: boolean;

  static newRating(): MovieRating {
    const r = new MovieRating();
    r.id = null;
    r.seen = null;
    r.rating = null;
    r.comment = null;
    return r;
  }

  newTitle() {
    return 'rating';
  }

}

export class UserRating {
  constructor(public displayName: string,
              public rating: ShortRating) {
  }

  hasComment(): boolean {
    return this.rating != null && this.rating.comment != null && this.rating.comment != '';
  }
}
