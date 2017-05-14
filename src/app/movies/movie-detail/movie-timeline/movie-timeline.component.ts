import { Component, OnInit, HostListener, ViewChild, ElementRef, OnChanges, SimpleChanges, Input } from '@angular/core';
import { MovieDetail } from "../../models/movie";
import { MovieRating } from "../../../shared/models/ratings";
import { MovieComment, MovieCreation } from "../../models/timeline";
import { MovieDetailService } from "../../services/movie-detail.service";
import { LijstrException } from "../../../core/exceptions";
import { User } from "../../../core/models/user";

@Component({
  selector: 'lijstr-movie-timeline',
  templateUrl: 'movie-timeline.component.html',
  styleUrls: ['movie-timeline.component.css']
})
export class MovieTimelineComponent implements OnInit, OnChanges {

  @ViewChild('timelineTop') timelineTop : ElementRef;

  @Input() movie : MovieDetail;
  @Input() availableUsers : User[];

  fetching : boolean;
  timeline : (MovieRating|MovieComment|MovieCreation)[];
  error : LijstrException;


  constructor(private detailService : MovieDetailService) { }


  ngOnChanges(changes : SimpleChanges) {
    if ('movie' in changes) {
      this.fetching = false;
      this.timeline = null;
      this.scrolled();
    }
  }

  ngOnInit() {
    this.scrolled();
  }

  @HostListener('window:scroll', ['$event'])
  scrolled() {
    let node = this.timelineTop.nativeElement;
    while(node.offsetTop == 0 && node.parentElement != null) {
      node = node.parentElement;
    }
    let offsetTop = node.offsetTop;

    if (window.innerHeight + document.body.scrollTop > offsetTop) {
      if (!this.fetching && this.timeline == null) {
        this.fetch();
      }
    }
  }

  getDisplayName(userId : number) {
    if (userId == null) return null;
    if (this.availableUsers != null) {
      for (let user of this.availableUsers) {
        if (user.id == userId) {
          return user.displayName;
        }
      }
    }
    return 'Onbekend';
  }

  isRating(obj : any) : boolean {
    return obj instanceof MovieRating;
  }

  isComment(obj : any) : boolean {
    return obj instanceof MovieComment;
  }

  isNewMovie(obj : any) : boolean {
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
        if (currentMovie == this.movie) {
          this.timeline = items;
          this.timeline.push(new MovieCreation(currentMovie.created, currentMovie.addedBy));
        }
      },
      (error : LijstrException) => {
        if (currentMovie == this.movie) {
          this.error = error;
        }
      }
    );
  }

}
