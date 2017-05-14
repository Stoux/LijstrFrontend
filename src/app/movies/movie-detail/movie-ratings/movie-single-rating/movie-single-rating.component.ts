import { Component, Input } from "@angular/core";
import { UserRating } from "../../../../shared/models/ratings";
import { MovieRatingsService } from "../../../services/movie-ratings.service";

@Component({
  selector: 'lijstr-movie-single-rating',
  templateUrl: './movie-single-rating.component.html'
})
export class MovieSingleRatingComponent {

  @Input() userRating : UserRating;
  @Input() ratingsService : MovieRatingsService;

  constructor() {
  }

}
