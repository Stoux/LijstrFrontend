import { ShortRating } from "./ratings";

/**
 * Payload for adding a new movie.
 */
export class AddMoviePayload {

  constructor(public imdbId : string, public youtubeId : string) {
  }

}

/**
 * Payload for requesting a new movie.
 * Also passes the user's would-be rating for that movie.
 */
export class MovieRequest extends AddMoviePayload {

  ratingRequest : ShortRating;

}

/**
 * A request that has already been saved.
 */
export class SavedMovieRequest extends AddMoviePayload {

  id : number;
  requestedBy : number;
  created : number;

  title : string;
  year : string;
  imdbRating : string;

  approvedBy : number;

}
