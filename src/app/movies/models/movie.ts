import { ShortRating } from "../../shared/models/ratings";
import { TargetDetail, TargetSummary } from "../../abs/models/target";

export class MovieSummary extends TargetSummary<ShortRating> {

  year : number;

  constructor(title : string) {
    super();
    this.title = title;
  }
}

export class MovieDetail extends TargetDetail<ShortRating> {

  year : number;
  released : number;

}

export class MovieUserMeta {
  wantToWatch : boolean;
}
