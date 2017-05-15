
import { TargetSummary } from "../models/target";
import { ShortRating } from "../../shared/models/ratings";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { ReplaySubject } from "rxjs/ReplaySubject";
import { ApiService } from "../../core/services/api.service";

export abstract class AbsSummaryService<Summary extends TargetSummary<ShortRating>> {

  private request : Subscription;
  protected hasSummaries : boolean;
  protected latestList : Summary[];
  protected listSubject : ReplaySubject<Summary[]>;

  constructor(protected api : ApiService,
              private path : string) {
    this.listSubject = new ReplaySubject(1);
    this.hasSummaries = false;
  }

  /**
   * Get all available summaries.
   * TODO: Modify to return observable
   * TODO: Add filtering options
   * TODO: Add sorting options
   * @returns {Array} array of summaries
   */
  getSummaries(forceFetch : boolean = false) : Observable<Summary[]> {
    let response = this.listSubject.asObservable();
    if ((this.hasSummaries && !forceFetch) || this.request != null) {
      return response;
    }

    let getRequest : Observable<Summary[]> = this.api.get('/' + this.path);
    this.request = getRequest.finally(() => this.request = null).subscribe(
      summaries => {
        this.changeList(summaries);
        this.hasSummaries = true;
      },
      error => {
        this.listSubject.error(error);
      }
    );

    return response;
  }

  protected changeList(list : Summary[]) : void {
    this.latestList = list;
    this.listSubject.next(list);
  }

}

