import { ShortRating } from './ratings';
import { Genre, Language, Person } from './imdb';

export class MovieSummary {

  id: number;
  imdbId: string;
  title: string;
  year: number;

  imdbRating: number;
  metacriticScore: number;

  ageRating: string;

  genres: Map<number, string>;
  languages: Map<number, string>;

  latestRatings: Map<number, ShortRating>;

  constructor(title: string) {
    this.title = title;
  }
}

export class MovieDetail {

  id: number;
  oldSiteId: number;

  created: number;
  lastUpdated: number;

  imdbId: string;
  title: string;
  originalTitle: string;
  dutchTitle: string;

  year: number;
  released: number;
  runtime: number;

  imdbRating: number;
  imdbVotes: number;
  metacriticScore: number;

  shortPlot: string;
  longPlot: string;

  ageRating: string;
  hasPoster: boolean;

  youtubeUrl: string;

  addedBy: number;

  genres: Genre[];
  languages: Language[];
  writers: Person[];
  directors: Person[];

  latestMovieRatings: ShortRating[];

}

export class MovieUserMeta {
  wantToWatch: boolean;
}
