import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { User } from '../../../core/models/user';
import { ShortRating, Seen, UserRating } from '../../models/ratings';
import { MovieRatingsService } from '../../services/movie-ratings.service';

// TODO: Add sorting? Or delegate to caller and base order on availableUsers?
@Component({
  selector: 'lijstr-movie-ratings',
  templateUrl: './movie-ratings.component.html',
  styleUrls: ['./movie-ratings.component.css']
})
export class MovieRatingsComponent implements OnChanges {

  constructor(public ratingsService: MovieRatingsService) {
    this.availableUsers = [];
    this.availableRatings = [];
  }

  @Input() availableUsers: User[];
  @Input() availableRatings: ShortRating[];

  ratings: UserRating[];

  private static hasValues(arr: any[]) {
    return arr != null && arr.length > 0;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ratings = [];

    if (this.hasUsers()) {
      for (const user of this.availableUsers) {
        this.ratings.push(new UserRating(
          user.displayName,
          this.getUsersRating(user)
        ));
      }
    }
  }

  hasUsers(): boolean {
    return MovieRatingsComponent.hasValues(this.availableUsers);
  }

  private getUsersRating(user: User): ShortRating {
    for (const rating of this.availableRatings) {
      if (rating.user == user.id) {
        return rating;
      }
    }
    return null;
  }

}
