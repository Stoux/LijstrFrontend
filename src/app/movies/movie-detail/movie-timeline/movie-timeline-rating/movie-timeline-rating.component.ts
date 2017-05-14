import { Component, Input } from "@angular/core";
import { MovieRating } from "../../../../shared/models/ratings";
import { MovieRatingsService } from "../../../services/movie-ratings.service";

@Component({
  selector: 'lijstr-movie-timeline-rating',
  templateUrl: './movie-timeline-rating.component.html'
})
export class MovieTimelineRatingComponent {

  @Input() rating : MovieRating;
  @Input() displayName : string;

  constructor(private ratingsService : MovieRatingsService) { }

  shortRatingText() : string {
    return this.ratingsService.shortRatingText(this.rating);
  }

  longRatingText() : string {
    return this.ratingsService.longRatingText(this.rating);
  }

}
