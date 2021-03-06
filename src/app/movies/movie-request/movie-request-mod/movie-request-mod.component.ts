import { Component, OnInit, ViewChild } from '@angular/core';
import { OmdbObject, OmdbApiService } from '../services/omdbapi.service';
import { Subject } from 'rxjs';
import { LijstrException } from '../../../core/exceptions';
import { MovieRequestService } from '../../services/movie-request.service';
import { AddMoviePayload } from '../../models/requests';
import { MovieOutstandingService } from '../../../core/services/section/movie-outstanding.service';
import { NgForm } from '@angular/forms';
import {debounceTime, distinctUntilChanged, finalize} from 'rxjs/operators';

@Component({
  selector: 'lijstr-movie-request-mod',
  templateUrl: './movie-request-mod.component.html',
  styleUrls: ['./movie-request-mod.component.css'],
  providers: [
    OmdbApiService
  ]
})
export class MovieRequestModComponent implements OnInit {

  constructor(private api: OmdbApiService,
              private requestService: MovieRequestService,
              private outstandingService: MovieOutstandingService) {
    this.imdbRegex = MovieRequestModComponent.createRegExp(this.imdbPattern);
    this.youtubeRegex = MovieRequestModComponent.createRegExp(this.youtubePattern);
  }

  @ViewChild('requestForm') private form: NgForm;

  imdbPattern = '(?:https?:\\/\\/)?(?:(?:www|m)\\.)?(?:imdb.com\\/title\\/)?(tt\\d{7,8})(?:\\/.*)?';
  imdbRegex: RegExp;
  // tslint:disable-next-line:max-line-length
  youtubePattern = '(?:https?:\\/\\/)?(?:www\\.)?(?:youtu\\.be\\/|youtube\\.com\\/(?:embed\\/|v\\/|watch\\?v=|watch\\?.+&v=))?((?:\\w|-){11})(?:\\S+)?';
  youtubeRegex: RegExp;


  searching: boolean;
  typing: boolean;
  submitting: boolean;

  imdbValue: string;
  imdbSubject: Subject<string>;

  youtubeId: string;

  result: OmdbObject;
  error: LijstrException;
  added: OmdbObject;
  previousResults: Map<string, OmdbObject | LijstrException>;

  private static createRegExp(pattern: string) {
    return new RegExp('^' + pattern + '$', 'i');
  }

  ngOnInit() {
    // Reset state
    this.searching = false;
    this.submitting = false;
    this.typing = false;
    this.imdbSubject = new Subject();

    this.result = null;
    this.error = null;
    this.previousResults = new Map();

    // Debounce for half a second before actually parsing the IMDB value
    this.imdbSubject.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(value => {
      this.typing = false;
      const matched = this.imdbRegex.exec(value);
      if (!matched) {
        return;
      }

      // Check if already found, otherwise fetch
      const imdbId = matched[1];
      if (this.previousResults.has(imdbId)) {
        this.onResult(imdbId, this.previousResults.get(imdbId));
      } else {
        this.searching = true;
        this.fetch(imdbId);
      }
    });
  }

  find(value: string) {
    this.imdbValue = value;
    this.reset();
    this.typing = true;
    this.imdbSubject.next(value);
  }

  onSubmit() {
    this.submitting = true;

    const youtubeId = this.extractYoutubeID();
    const payload = new AddMoviePayload(this.result.imdbId, youtubeId);

    this.requestService.addMovie(payload)
      .pipe(finalize(() => this.submitting = false))
      .subscribe(
        () => {
          // Increase outstanding movies & reset form
          this.outstandingService.increase();
          const added = this.result;
          this.form.reset();
          this.reset();
          this.added = added;
        },
        (error) => this.error = error
      );
  }

  private fetch(imdbId: string) {
    this.api.getMovie(imdbId)
      .pipe(finalize(() => this.searching = false))
      .subscribe(
        value => this.onResult(imdbId, value),
        error => this.onResult(imdbId, error)
      );
  }

  private onResult(imdbId: string, result: OmdbObject | LijstrException) {
    this.reset();
    this.previousResults.set(imdbId, result);

    if ('successful' in result) {
      this.result = result as OmdbObject;
    } else if (result instanceof LijstrException) {
      this.error = result as LijstrException;
    }
  }

  private reset() {
    this.error = null;
    this.result = null;
    this.added = null;
  }

  private extractYoutubeID() {
    if (this.youtubeId == null || this.youtubeId == '') {
      return null;
    }

    const matched = this.youtubeRegex.exec(this.youtubeId);
    if (!matched) {
      // Shouldn't happen
      return null;
    }

    return matched[1];
  }

}
