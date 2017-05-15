import { EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { TargetSummary } from "../models/target";
import { ShortRating } from "../../shared/models/ratings";
import { LijstrException } from "../../core/exceptions";
import { UserService } from "../../core/services/user.service";
import { Subscription } from "rxjs/Subscription";
import { User } from "../../core/models/user";
import { AbsSummaryService } from "../services/target.services";

export abstract class AbstractListFilter<Summary extends TargetSummary<ShortRating>, Service extends AbsSummaryService<Summary>> implements OnInit, OnDestroy {

  @Output() filtered = new EventEmitter<Summary[]>();
  @Output() error = new EventEmitter<LijstrException>();

  public targetUser : boolean;

  public summaries : Summary[];
  public filter : string;

  private userSubscription : Subscription;
  private listSubscription : Subscription;

  constructor(protected userService : UserService,
              protected listService : Service) {
  }

  ngOnInit() : void {
    this.targetUser = true;

    this.userSubscription = this.userService.userChangeFeed().subscribe(this.isTargetUser);

    this.listSubscription = this.listService.getSummaries(false).subscribe(
      list => {
        this.summaries = list;
        this.applyFilters();
      },
      error => {
        this.error.emit(error);
      }
    );
  }

  protected abstract isTargetUser(newUser : User) : boolean;

  ngOnDestroy() : void {
    this.userSubscription.unsubscribe();
    this.listSubscription.unsubscribe();
  }

  public onFilter(value : string) : void {
    value = value.toLowerCase();
    this.filter = value;
    this.applyFilters();
  }

  protected applyFilters() {
    let result = this.summaries;

    //Apply the text filter (on title)
    let filter = this.filter;
    if (filter != null && filter.length > 0) {
      result = result.filter(function (d) {
        return d.title.toLowerCase().indexOf(filter) !== -1 || !filter;
      });
    }

    result = this.applyExtraFilters(result);
    this.filtered.emit(result);
  }

  /**
   * Apply extra filters to the list.
   * @param summaries The available summaries
   * @return The filtered summaries
   */
  protected abstract applyExtraFilters(summaries : Summary[]) : Summary[];

}
