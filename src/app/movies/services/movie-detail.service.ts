import { Injectable } from "@angular/core";
import { ApiService } from "../../core/services/api.service";
import { Observable } from "rxjs";
import { MovieDetail } from "../models/movie";
import { DataWrapper } from "../../core/models/common";
import { MovieRating } from "../models/ratings";

@Injectable()
export class MovieDetailService {

  constructor(private api : ApiService) {
  }

  /**
   * Get the details of a movie.
   * @param id The movie's ID
   * @returns {Observable<MovieDetail>}
   */
  getMovieDetail(id : number) : Observable<MovieDetail> {
    return this.api.get('/movies/' + id);
  }

}
