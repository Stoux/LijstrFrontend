/**
 * Model for a show used in the table / overview.
 */
import { User } from '../../core/models/user';

export interface ShowSummary {

  id: number;
  title: string;
  startYear: number;
  // Null if still running
  endYear: number;

  // Timestamp of the next episode that's going to air
  nextEpisode: number;

  // Number of seaons
  seasons: number;
  // Number of episodes
  episodes: number;

  imdbRating: number;
  tmdbRating: number;

  status: string;
  type: string;

}

export interface ShowDetail {

  id: number;
  title?: string;
  overview?: string;

  imdbId?: string;
  tmdbId: number;

  imdbRating?: number;
  imdbVotes?: number;

  tmdbRating?: number;
  tmdbVotes?: number;

  status?: string;
  type?: string;
  inProduction?: boolean;

  posterImage: string;

  // TODO: Replace with number like MovieDetail
  addedBy?: User;

  seasonsIncludingSpecials: ShowSeasonDetail[];

}


export interface ShowSeasonDetail {

  id: number;
  tmdbId: number;
  seasonNumber: number;
  title?: string;
  overview: string;
  posterImage: string;
  specials: boolean;

}
