import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs";
import { LijstrException } from "../../../core/exceptions";
import { ApiService } from "../../../core/services/api.service";

export class OmdbObject {

  imdbId : string;
  title : string;
  year : string;
  released : string;
  runtime : string;
  imdbRating : string;
  imdbVotes : string;
  type : string;
  plot : string;
  poster : string;
  response : string;
  error : string;

}

@Injectable()
export class OmdbApiService {

  constructor(private api : ApiService) {
  }

  /**
   * Get a movie.
   * @param imdbId The IMDB id
   * @returns {Observable<OmdbObject>}
   */
  getMovie(imdbId : string) : Observable<OmdbObject> {
    return this.api.get('/omdb/' + imdbId)
      .map(OmdbApiService.handleResponse);
  }

  private static handleResponse(result : any) : any {
    if (result.type != 'movie') {
      return LijstrException.forErrorMessage(400, 'Niet een film.');
    }

    return result;
  }

}
