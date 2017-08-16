import { Injectable } from '@angular/core';
import {ApiService} from "../../core/services/api.service";
import {Observable} from "rxjs/Observable";
import {ReplaySubject} from "rxjs/ReplaySubject";

@Injectable()
export class ImdbService {

  private genres : ImdbFetcher;
  private languages : ImdbFetcher;

  constructor(private api : ApiService) {
    this.genres = new ImdbFetcher(api, '/genres');
    this.languages = new ImdbFetcher(api, '/languages');
  }

  getGenres() : Observable<Map<string, string>> {
    return this.genres.get();
  }

  getLanguages() : Observable<Map<string, string>> {
    return this.languages.get();
  }

}

class ImdbFetcher {

  private subject : ReplaySubject<Map<string, string>>;
  private hasRequested : boolean;

  constructor(private api : ApiService, private path : string) {
    this.subject = new ReplaySubject(1);
    this.hasRequested = false;
  }

  get() : Observable<Map<string, string>> {
    if (this.hasRequested) {
      return this.single();
    }

    this.hasRequested = true;

    const request : Observable<Map<string, string>> = this.api.get(this.path);
    request.subscribe(
      result => {
        this.subject.next(result);
      },
      error => {
        this.subject.error(error);
      }
    );

    return this.single();
  }

  private single() : Observable<Map<string, string>> {
    return this.subject.asObservable().first();
  }

}
