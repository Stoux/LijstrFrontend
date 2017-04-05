import { MovieSummary } from "./movie";
/**
 * Movie stats for a specific user.
 * All fields are a counter with how many ratings meet that requirement (unless specified otherwise).
 */
export class MovieUserStats {

  added : number;
  filledIn : number;
  seen : number;
  notSeen : number;
  noIdea : number;
  unknownRating : number;
  withComment : number;

  /**
   * The user's average rating over all given ratings.
   */
  averageRating : number;

}

/**
 * General stats about the movies data.
 */
export class MovieStats {

  /**
   * Total number of movies.
   */
  numberOfMovies : number;

  averageImdb : number;
  averageMetacritic : number;
  averageRuntime : number;

  /**
   * Map with years (key) -> number of movies in that year.
   */
  moviesPerYear : Map<number, number>;

  /**
   * Map of the user's ID to their stats.
   */
  userToStats : Map<number, MovieUserStats>;

}

/**
 * A change regarding a movie.
 */
export class MovieChange<T> {
  movie : MovieSummary;
  change : T;
}
