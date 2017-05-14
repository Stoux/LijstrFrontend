
import { ShortRating } from "../../shared/models/ratings";
import { Genre, Language } from "../../shared/models/imdb";

export abstract class TargetSummary<SR extends ShortRating>{

  id : number;
  imdbId : string;
  title : string;

  imdbRating : number;
  metacriticScore : number;
  ageRating : string;

  genres : Map<number, string>;
  languages : Map<number, string>;

  latestRatings : Map<number, SR>;

}

export abstract class TargetDetail<SR extends ShortRating> {

  id : number;
  oldSiteId : number;

  created : number;
  lastUpdated : number;

  imdbId : string;
  title : string;
  originalTitle : string;
  dutchTitle : string;

  runtime : number;

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

  //TODO: Change in backend to 'latestRatings'
  latestMovieRatings : SR[];

}
