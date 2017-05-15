import { ShortRating } from "../../shared/models/ratings";
import { TargetDetail, TargetSummary } from "../../abs/models/target";

export class ShowSummary extends TargetSummary<ShortRating> {

  constructor(title : string) {
    super();
    this.title = title;
  }
}

export class ShowDetail extends TargetDetail<ShortRating> {

  status : string;
  scriptType : string;

  startYear : number;
  endYear : number;
  premierDate : number;

  //TODO: Seasons

}

