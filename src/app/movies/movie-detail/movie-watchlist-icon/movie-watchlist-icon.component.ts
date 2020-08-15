import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MovieDetailService } from '../../services/movie-detail.service';
import { MovieDetail, MovieUserMeta } from '../../models/movie';
import { LijstrException } from '../../../core/exceptions';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'lijstr-movie-watchlist-icon',
  templateUrl: './movie-watchlist-icon.component.html',
  styleUrls: ['./movie-watchlist-icon.component.scss']
})
export class MovieWatchlistIconComponent implements OnChanges {

  @Input() movie: MovieDetail;
  @Input() showP: boolean;

  btnClasses: any;
  glyphiconClasses: any;

  hoverState: boolean;
  wantsToWatch: boolean;

  userMeta: MovieUserMeta;
  submitting: boolean;
  error: LijstrException;

  constructor(private movieService: MovieDetailService) {
    this.hoverState = false;
    this.showP = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.wantsToWatch = null;
    this.submitting = false;
    this.error = null;

    const currentMovie = this.movie;
    this.movieService.getMovieUserMeta(currentMovie.id).subscribe(
      meta => {
        if (this.movie == currentMovie) {
          this.userMeta = meta;
          this.wantsToWatch = meta.wantToWatch;
          this.refreshClasses();
        }
      }
    );
  }

  public setHoverState(newState: boolean) {
    this.hoverState = newState;
    this.refreshClasses();
  }

  public submitChange(): void {
    this.submitting = true;
    this.userMeta.wantToWatch = !this.wantsToWatch;
    const currentMovie = this.movie;
    this.movieService.saveMovieUserMeta(currentMovie.id, this.userMeta)
      .pipe(finalize(() => {
        if (currentMovie == this.movie) {
          this.submitting = false;
        }
      }))
      .subscribe(
        () => {
          if (currentMovie == this.movie) { this.wantsToWatch = this.userMeta.wantToWatch; }
        },
        (error: LijstrException) => {
          if (currentMovie == this.movie) { this.error = error; }
        }
      );
  }

  public getButtonTitle(): string {
    if (this.wantsToWatch == null) {
      return 'Laden...';
    } else if (this.wantsToWatch == true) {
      return 'Deze wil ik niet meer zien';
    } else if (this.wantsToWatch == false) {
      return 'Deze wil ik zien';
    }
  }

  private refreshClasses() {
    this.btnClasses = {
      btn: true,
      'btn-primary': !this.hoverState,
      'btn-danger': this.hoverState && this.wantsToWatch == true,
      'btn-success': this.hoverState && this.wantsToWatch == false
    };

    this.glyphiconClasses = {
      glyphicon: true,
      'glyphicon-question-sign': this.wantsToWatch == null,
      'glyphicon-eye-open': (this.hoverState && this.wantsToWatch == false) || (!this.hoverState && this.wantsToWatch == true),
      'glyphicon-eye-close': (this.hoverState && this.wantsToWatch == true) || (!this.hoverState && this.wantsToWatch == false)
    };
  }

}
