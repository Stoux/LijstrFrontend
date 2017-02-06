import { Serializable } from "../../core/models/common";

/**
 * A comment left on a movie.
 */
export class MovieComment extends Serializable {

  id : number;
  lastModified : number;
  created : number;

  user : number;
  comment : string;

}

/**
 * Marks the creation of a movie.
 * (As in when added to the system)
 */
export class MovieCreation {
  constructor(public created : number, public user : number) {
  }
}
