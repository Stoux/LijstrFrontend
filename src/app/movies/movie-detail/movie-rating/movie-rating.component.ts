import { Component, Input, OnChanges, SimpleChanges, ViewChild, EventEmitter, Output } from "@angular/core";
import { MovieDetail } from "../../models/movie";
import { Seen, MovieRating } from "../../models/ratings";
import { DataWrapper } from "../../../core/models/common";
import { LijstrException } from "../../../core/exceptions";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";
import { MovieRatingsService } from "../../services/movie-ratings.service";

@Component({
  selector: 'lijstr-movie-rating',
  templateUrl: './movie-rating.component.html',
  styleUrls: ['./movie-rating.component.css']
})
export class MovieRatingComponent implements OnChanges {

  private static readonly EDIT_BUFFER : number = (30 * 60 * 1000);

  @ViewChild('ratingForm') private form : NgForm;

  @Input() private movie : MovieDetail;

  submitting : boolean;
  cachedRating : MovieRating;
  userRating : MovieRating;
  error : string;

  seenOptions = [
    {value: Seen.YES, title: "Ja"},
    {value: Seen.NO, title: "Nee"},
    {value: Seen.UNKNOWN, title: "?"}
  ];
  unknownRating : boolean;

  constructor(private ratingsService : MovieRatingsService) {
    this.unknownRating = false;
    this.submitting = false;
  }

  ngOnChanges(changes : SimpleChanges) {
    this.error = null;

    if ('movie' in changes) {
      this.setActiveRating(MovieRating.newRating());
      this.form.reset();

      const currentMovie = this.movie;
      this.ratingsService.getLatestMovieRatingForUser(this.movie.id)
        .subscribe(
          (ratingWrapper : DataWrapper<MovieRating>) => {
            if (this.movie.id == currentMovie.id && ratingWrapper.data != null) {
              this.setActiveIfEditable(ratingWrapper.data);
            }
          },
          (error : LijstrException) => {
            this.error = LijstrException.toString(error);
          }
        );
    }

    if (this.userRating == null) {
      this.userRating = MovieRating.newRating();
    }
  }

  onSubmit() {
    this.submitting = true;

    if (this.unknownRating || !this.isSeenYes()) {
      this.userRating.rating = null;
    }

    let ratingCall : Observable<MovieRating>;
    if (this.isEdit()) {
      ratingCall = this.ratingsService.editRating(this.movie.id, this.userRating);
    } else {
      ratingCall = this.ratingsService.addRating(this.movie.id, this.userRating);
    }

    ratingCall.finally(() => this.submitting = false)
      .subscribe(
        (newRating : MovieRating) => {
          this.setActiveIfEditable(newRating);
          this.ratingsService.onChange(this.movie.id, newRating);
        },
        (error : LijstrException) => {
          this.error = LijstrException.toString(error);
        },
        () => this.submitting = false
      );
  }

  isSeenYes() {
    return this.userRating.seen == Seen.YES;
  }

  isEdit() {
    return this.userRating.id != null;
  }

  isChanged() {
    if (this.userRating.seen != this.cachedRating.seen || this.userRating.comment != this.cachedRating.comment) {
      return true;
    }

    let curRatingvalue = this.unknownRating ? null : this.userRating.rating;
    return curRatingvalue != this.cachedRating.rating;
  }

  toggleUnknownRating() {
    if (this.userRating.seen == Seen.YES) {
      this.unknownRating = !this.unknownRating;
    }
  }

  private setActiveRating(rating : MovieRating) {
    this.userRating = rating;
    this.unknownRating = this.isSeenYes() && rating.rating == null;
    this.cachedRating = new MovieRating();
    this.copyFields(rating, this.cachedRating);
  }

  private setActiveIfEditable(rating : MovieRating) {
    if (MovieRatingComponent.isEditable(rating)) {
      this.setActiveRating(rating);
    } else {
      this.userRating.id = null;
      this.copyFields(rating, this.userRating);
      this.setActiveRating(this.userRating);
    }
  }

  private copyFields(source : MovieRating, target : MovieRating) {
    target.seen = source.seen;
    target.rating = source.rating;
    target.comment = source.comment;
  }

  private static isEditable(rating : MovieRating) {
    return new Date().getTime() < rating.created + MovieRatingComponent.EDIT_BUFFER;
  }


}
