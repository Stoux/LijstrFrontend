import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { User } from "../../../core/models/user";
import { ShortRating, Seen } from "../../models/ratings";
import { DecimalPipe } from "@angular/common";

class UserRating {
  constructor(public displayName : string,
              public rating : ShortRating) {
  }

  hasComment() : boolean {
    return this.rating != null && this.rating.comment != null && this.rating.comment != "";
  }
}

//TODO: Add sorting? Or delegate to caller and base order on availableUsers?
@Component({
  selector: 'lijstr-movie-ratings',
  templateUrl: './movie-ratings.component.html',
  styleUrls: ['./movie-ratings.component.css']
})
export class MovieRatingsComponent implements OnChanges {

  @Input() availableUsers : User[];
  @Input() availableRatings : ShortRating[];

  ratings : UserRating[];

  private numberPipe : DecimalPipe;

  constructor() {
    this.availableUsers = [];
    this.availableRatings = [];
    this.numberPipe = new DecimalPipe('en-US');
  }

  ngOnChanges(changes : SimpleChanges) : void {
    this.ratings = [];

    if (this.hasUsers()) {
      for (let user of this.availableUsers) {
        this.ratings.push(new UserRating(
          user.displayName,
          this.getUsersRating(user)
        ));
      }
    }
  }

  hasUsers() : boolean {
    return MovieRatingsComponent.hasValues(this.availableUsers);
  }

  shortRatingText(shortRating : ShortRating) {
    if (!shortRating) {
      return 'Nog niet ingevuld';
    } else if (shortRating.seen == Seen.NO) {
      return 'Niet gezien';
    } else if (shortRating.seen == Seen.YES) {
      return this.ratingValueText(shortRating.rating);
    } else {
      return 'Not sure if gezien';
    }
  }

  longRatingText(shortRating : ShortRating) {
    if (!shortRating) {
      return 'heeft nog niks ingevuld.';
    } else if (shortRating.seen == Seen.NO) {
      return 'heeft de film nog niet gezien.'
    } else if (shortRating.seen == Seen.YES) {
      return 'heeft de film gezien | ' + this.ratingValueText(shortRating.rating);
    } else {
      //TODO: Add gender?
      return 'weet niet meer hij/zij de film heeft gezien.';
    }
  }

  private ratingValueText(value : number) {
    let valueAsText;
    if (value == null) {
      valueAsText = '?';
    } else {
      valueAsText = this.numberPipe.transform(value, '1.1-1');
    }
    return 'Rating: ' + valueAsText + '/10';
  }


  private getUsersRating(user : User) : ShortRating {
    for (let rating of this.availableRatings) {
      if (rating.user == user.id) {
        return rating;
      }
    }
    return null;
  }

  private static hasValues(arr : any[]) {
    return arr != null && arr.length > 0;
  }

}
