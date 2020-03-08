import { Injectable } from '@angular/core';
import {ApiService} from '../../core/services/api.service';
import {Observable} from 'rxjs';
import {ReplaySubject} from 'rxjs';
import {first} from 'rxjs/operators';
import { CachedSubject } from '../classes/cached-subject';

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

  private subject: CachedSubject<{ [key: number]: string }>;

  constructor(protected api: ApiService,
              protected path: string) {
    this.subject = new CachedSubject(() => this.api.get(this.path));
  }

  /**
   * Fetch all people
   * @param query optional name query
   */
  get(query?: string): Observable<{ [key: number]: string }> {
    // Cache requests that have no query
    if (query === null || query === '') {
      return this.subject.asObservable();
    }

    const params = query ? { name: query } : {};
    return this.api.get<{ [key: number]: string }>(this.path, true, params);
  }

  private single(): Observable<{ [key: number]: string }> {
    return this.subject.asObservable().pipe(
      first()
    );
  }

}
