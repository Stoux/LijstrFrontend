
import { TargetSummary } from "../models/target";
import { ShortRating } from "../../shared/models/ratings";
import { Observable } from "rxjs/Observable";

export interface SummaryService<Summary extends TargetSummary<ShortRating>> {

  getSummaries(forceFetch : boolean) : Observable<Summary[]>;

}

