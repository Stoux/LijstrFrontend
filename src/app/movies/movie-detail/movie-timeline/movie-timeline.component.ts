import {
  Component,
  HostListener,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges,
  Input,
  AfterViewInit
} from '@angular/core';
import { MovieDetail } from '../../models/movie';
import { MovieRating } from '../../models/ratings';
import { MovieComment, MovieCreation } from '../../models/timeline';
import { MovieDetailService } from '../../services/movie-detail.service';
import { LijstrException } from '../../../core/exceptions';
import { User } from '../../../core/models/user';

@Component({
  selector: 'lijstr-movie-timeline',
  templateUrl: 'movie-timeline.component.html',
  styleUrls: ['movie-timeline.component.css'],
})
export class MovieTimelineComponent implements AfterViewInit, OnChanges {

  @ViewChild('timelineTop', {read: ElementRef}) timelineTop?: ElementRef<HTMLElement>;

  @Input() movie: MovieDetail;
  @Input() availableUsers: User[];

  fetching: boolean;
  timeline: (MovieRating|MovieComment|MovieCreation)[];
  error: LijstrException;


  constructor(private detailService: MovieDetailService) { }


  ngOnChanges(changes: SimpleChanges) {
    if ('movie' in changes) {
      this.fetching = false;
      this.timeline = null;
      this.onScrolled();
    }
  }

  ngAfterViewInit() {
    this.onScrolled();
  }

  @HostListener('document:scroll', [])
  onScrolled() {
    if (!this.timelineTop) {
      return;
    }

    let node = this.timelineTop.nativeElement;
    while (node.offsetTop === 0 && node.parentElement != null) {
      node = node.parentElement;
    }
    const offsetTop = node.offsetTop;

    if ((window.innerHeight + document.documentElement.scrollTop) > offsetTop) {
      if (!this.fetching && this.timeline == null) {
        this.fetch();
      }
    }
  }

  getDisplayName(userId: number) {
    if (userId == null) { return null; }
    if (this.availableUsers != null) {
      for (const user of this.availableUsers) {
        if (user.id === userId) {
          return user.displayName;
        }
      }
    }
    return 'Onbekend';
  }

  isRating(obj: any): boolean {
    return obj instanceof MovieRating;
  }

  isComment(obj: any): boolean {
    return obj instanceof MovieComment;
  }

  isNewMovie(obj: any): boolean {
    return obj instanceof MovieCreation;
  }

  refresh() {
    this.fetch();
  }

  private fetch() {
    this.fetching = true;
    const currentMovie = this.movie;
    this.detailService.getMovieTimeline(currentMovie.id).subscribe(
      items => {
        if (currentMovie === this.movie) {
          this.timeline = items;
          this.timeline.push(new MovieCreation(currentMovie.created, currentMovie.addedBy));
        }
      },
      (error: LijstrException) => {
        if (currentMovie === this.movie) {
          this.error = error;
        }
      }
    );
  }

}
