import { Injectable } from "@angular/core";
import { MovieSummary } from "../models/movie";
import { ApiService } from "../../core/services/api.service";
import { ReplaySubject, Observable, Subscription } from "rxjs";

@Injectable()
export class MovieListService {

  private request : Subscription;
  private hasMovies : boolean;
  private heroesList : ReplaySubject<MovieSummary[]>;

  constructor(private api : ApiService) {
    console.log('New MovieListService');
    this.heroesList = new ReplaySubject(1);
    this.hasMovies = false;
  }

  /**
   * Get all available movie summaries.
   * TODO: Modify to return observable
   * TODO: Add filtering options
   * TODO: Add sorting options
   * @returns {Array} array of summaries
   */
  getSummaries(forceFetch : boolean = false) : Observable<MovieSummary[]> {
    let response = this.heroesList.asObservable();
    if ((this.hasMovies && !forceFetch) || this.request != null) {
      return response;
    }

    console.log('Fetching new list.');

    let getRequest : Observable<MovieSummary[]> = this.api.get('/movies');
    this.request = getRequest.finally(() => this.request = null).subscribe(
      summaries => {
        this.heroesList.next(summaries);
        this.hasMovies = true;
      },
      error => {
        this.heroesList.error(error);
      }
    );

    return response;
  }

}
