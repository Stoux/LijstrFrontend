import { Component, OnInit, HostListener, ViewChild, ElementRef, OnChanges, SimpleChanges, Input } from '@angular/core';
import { MovieDetail } from "../../models/movie";
import { MovieRating } from "../../models/ratings";
import { MovieComment, MovieCreation } from "../../models/timeline";
import { MovieDetailService } from "../../services/movie-detail.service";
import { LijstrException } from "../../../core/exceptions";

@Component({
  selector: 'lijstr-movie-timeline',
  templateUrl: 'movie-timeline.component.html',
  styleUrls: ['movie-timeline.component.css']
})
export class MovieTimelineComponent implements OnInit, OnChanges {

  @ViewChild('timelineTop') timelineTop : ElementRef;
  @Input() movie : MovieDetail;
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
    if (window.innerHeight + document.body.scrollTop > this.timelineTop.nativeElement.offsetTop) {
      if (!this.fetching && this.timeline == null) {
        this.fetch();
      }
    }
  }

  private fetch() {
    console.log('Fetching!');
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
