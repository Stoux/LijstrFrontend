import { Component, Input } from "@angular/core";
import { ExtendedRating } from "../../../../shared/models/ratings";
import { MovieRatingsService } from "../../../services/movie-ratings.service";

@Component({
  selector: 'lijstr-movie-timeline-rating',
  templateUrl: './movie-timeline-rating.component.html'
})
export class MovieTimelineRatingComponent {

  @Input() rating : ExtendedRating;
  @Input() displayName : string;

  constructor(private ratingsService : MovieRatingsService) { }

  shortRatingText() : string {
    return this.ratingsService.shortRatingText(this.rating);
  }

  longRatingText() : string {
    return this.ratingsService.longRatingText(this.rating);
  }

}
