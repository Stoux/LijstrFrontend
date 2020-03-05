import { Component, Input } from '@angular/core';
import { MovieCreation } from '../../../models/timeline';

@Component({
  selector: 'lijstr-movie-timeline-new-movie',
  templateUrl: './movie-timeline-new-movie.component.html'
})
export class MovieTimelineNewMovieComponent {

  @Input() creation: MovieCreation;
  @Input() displayName: string;

  constructor() { }

}
