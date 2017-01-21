import { ShortRating } from "./ratings/short-rating";

export class MovieSummary {

  id : number;
  imdbId : string;
  title : string;
  year : number;

  ageRating : string;

  genres : Map<number, string>;
  languages : Map<number, string>;

  latestRatings : ShortRating[];

  constructor(title : string) {
    this.title = title;
  }
}
