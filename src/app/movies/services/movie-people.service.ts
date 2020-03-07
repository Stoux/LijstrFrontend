import { Injectable } from '@angular/core';
import {ApiService} from '../../core/services/api.service';
import {ImdbFetcher} from '../../shared/services/imdb.service';
import {Observable} from 'rxjs';

@Injectable()
export class MoviePeopleService {

  public writers: MoviePeopleFetcher;
  public directors: MoviePeopleFetcher;
  public actors: MoviePeopleFetcher;

  constructor(private api: ApiService) {
    this.writers = new MoviePeopleFetcher(api, '/movies/writers/');
    this.directors = new MoviePeopleFetcher(api, '/movies/directors/');
    this.actors = new MoviePeopleFetcher(api, '/movies/characters/');
  }
}

export class MoviePeopleFetcher extends ImdbFetcher {

  /**
   * Fetch all items by that person.
   * @param id Lijstr ID of the person
   */
  public getByPerson(id: number|string): Observable<{ [key: number]: string }> {
    return this.api.get<{ [key: number]: string }>(this.path + id);
  }

}

