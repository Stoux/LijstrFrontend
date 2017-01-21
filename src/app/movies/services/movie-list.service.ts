import { Injectable } from '@angular/core';
import { MovieSummary } from "../models/movie-summary";

@Injectable()
export class MovieListService {

  constructor() { }

  /**
   * Get all available movie summaries.
   * TODO: Modify to return observable
   * TODO: Add filtering options
   * TODO: Add sorting options
   * @returns {Array} array of summaries
   */
  getSummaries() : MovieSummary[] {
    //TODO: Implement
    return []
  }

}
