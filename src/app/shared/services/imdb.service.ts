import { Injectable } from '@angular/core';
import {ApiService} from '../../core/services/api.service';
import {Observable} from 'rxjs';
import {ReplaySubject} from 'rxjs';
import {first} from 'rxjs/operators';

@Injectable()
export class ImdbService {

  private genres: ImdbFetcher;
  private languages: ImdbFetcher;

  constructor(private api: ApiService) {
    this.genres = new ImdbFetcher(api, '/genres');
    this.languages = new ImdbFetcher(api, '/languages');
  }

  getGenres(): Observable<{ [key: number]: string }> {
    return this.genres.get();
  }

  getLanguages(): Observable<{ [key: number]: string }> {
    return this.languages.get();
  }

}

export class ImdbFetcher {

  protected subject: ReplaySubject<{ [key: number]: string }>;
  protected hasRequested: boolean;

  constructor(protected api: ApiService, protected path: string) {
    this.subject = new ReplaySubject(1);
    this.hasRequested = false;
  }

  get(): Observable<{ [key: number]: string }> {
    if (this.hasRequested) {
      return this.single();
    }

    this.hasRequested = true;

    const request: Observable<{ [key: number]: string }> = this.api.get(this.path);
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

  private single(): Observable<{ [key: number]: string }> {
    return this.subject.asObservable().pipe(
      first()
    );
  }

}
