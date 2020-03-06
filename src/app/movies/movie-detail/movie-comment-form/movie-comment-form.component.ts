import { Component, Output, EventEmitter, Input, ViewChild, OnChanges } from '@angular/core';
import { MovieDetail } from '../../models/movie';
import { NgForm } from '@angular/forms';
import { MovieDetailService } from '../../services/movie-detail.service';
import { LijstrException } from '../../../core/exceptions';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'lijstr-movie-comment-form',
  templateUrl: './movie-comment-form.component.html',
  styleUrls: ['./movie-comment-form.component.css']
})
export class MovieCommentFormComponent implements OnChanges {

  @ViewChild('commentForm') private form: NgForm;

  @Input() movie: MovieDetail;
  @Output() newComment = new EventEmitter<any>();

  submitting: boolean;
  comment: string;
  error: LijstrException;

  constructor(private detailService: MovieDetailService) {
  }

  ngOnChanges(): void {
    this.submitting = false;
    this.comment = null;
    this.error = null;
    if (this.form) {
      // Chance that the form hasn't been rendered yet, so nothing to reset.
      this.form.reset();
    }
  }

  onSubmit(): void {
    this.submitting = true;
    this.detailService.placeComment(this.movie.id, this.comment)
      .pipe(finalize(() => this.submitting = false))
      .subscribe(
        (result) => {
          this.newComment.emit(result);
          this.form.reset();
        },
        (error) => this.error = error
      );
  }

}
