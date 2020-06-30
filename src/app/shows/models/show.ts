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
