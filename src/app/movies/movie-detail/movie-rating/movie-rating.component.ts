import { Component, Input, OnChanges, SimpleChanges, ViewChild, EventEmitter, Output } from "@angular/core";
import { MovieDetail } from "../../models/movie";
import { Seen, MovieRating } from "../../../shared/models/ratings";
import { DataWrapper } from "../../../core/models/common";
import { LijstrException } from "../../../core/exceptions";
import { NgForm } from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { MovieRatingsService } from "../../services/movie-ratings.service";
import { MovieOutstandingService } from "../../../core/services/section/movie-outstanding.service";

@Component({
  selector: 'lijstr-movie-rating',
  templateUrl: './movie-rating.component.html',
  styleUrls: ['./movie-rating.component.css']
})
export class MovieRatingComponent implements OnChanges {

  private static readonly EDIT_BUFFER : number = (30 * 60 * 1000);

  @ViewChild('ratingForm') private form : NgForm;

  @Input() private movie : MovieDetail;
  @Input() private findOldRatings : boolean; //Should try to find old ratings
  @Input() showNotSeenButton : boolean;
  @Output() private ratingChanged : EventEmitter<MovieRating>;

  submitting : boolean;
  changeSubscription : Subscription;
  cachedRating : MovieRating;
  userRating : MovieRating;
  error : string;
  foundOldRating : boolean;

  seenOptions = [
    {value: Seen.YES, title: "Ja"},
    {value: Seen.NO, title: "Nee"},
    {value: Seen.UNKNOWN, title: "Weet niet meer"}
  ];
  unknownRating : boolean;

  constructor(private ratingsService : MovieRatingsService,
              private outstandingService : MovieOutstandingService) {
    this.unknownRating = false;
    this.submitting = false;
    this.findOldRatings = true;
    this.showNotSeenButton = false;
    this.ratingChanged = new EventEmitter();
  }

  ngOnChanges(changes : SimpleChanges) {
    this.error = null;

    if ('movie' in changes) {
      this.setActiveRating(MovieRating.newRating());
      this.form.reset();
      this.foundOldRating = false;
      this.changeSubscription = null;

      const currentMovie = this.movie;
      if (this.findOldRatings) {
        this.ratingsService.getLatestMovieRatingForUser(this.movie.id)
          .subscribe(
            (ratingWrapper : DataWrapper<MovieRating>) => {
              if (this.movie.id == currentMovie.id && ratingWrapper.data != null) {
                this.foundOldRating = true;
                this.setActiveIfEditable(ratingWrapper.data);
              }
            },
            (error : LijstrException) => {
              this.error = LijstrException.toString(error);
            }
          );
      }
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

    const isNewRating = !this.foundOldRating;
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
          this.changeSubscription = Observable.timer(3000).subscribe(
            x => this.changeSubscription = null
          );

          if (isNewRating) {
            this.outstandingService.decrease();
          }

          this.ratingChanged.emit(newRating);
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

  notSeen() {
    this.userRating.seen = Seen.NO;
    this.form.ngSubmit.emit();
  }

  toggleUnknownRating() {
    if (this.userRating.seen == Seen.YES) {
      this.unknownRating = !this.unknownRating;
    }
  }

  handleRatingKeyPress(key : string) {
    if (key == '?') {
      this.toggleUnknownRating();
    }
  }

  private setActiveRating(rating : MovieRating) {
    this.userRating = rating;
    this.unknownRating = this.isSeenYes() && rating.rating == null;
    this.cachedRating = new MovieRating();
    this.copyFields(rating, this.cachedRating);
  }

  private setActiveIfEditable(rating : MovieRating) {
    this.foundOldRating = true;
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
