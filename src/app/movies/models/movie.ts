import { ShortRating } from "./ratings/short-rating";
import { Genre, Language } from "./imdb";

export class MovieSummary {

  id : number;
  imdbId : string;
  title : string;
  year : number;

  imdbRating : number;
  metacriticScore : number;

  ageRating : string;

  genres : Map<number, string>;
  languages : Map<number, string>;

  latestRatings : ShortRating[];

  constructor(title : string) {
    this.title = title;
  }
}

export class MovieDetail {

  id : number;

  created : number;
  lastUpdated : number;

  imdbId : string;
  title : string;
  year : number;
  released : number;

  imdbRating : number;
  imdbVotes : number;
  metacriticScore : number;

  shortPlot : string;
  longPlot : string;

  ageRating : string;
  hasPoster : boolean;

  youtubeUrl : string;

  addedBy : number;

  genres : Genre[];
  languages : Language[];

}
