import { OnInit, ViewChild } from "@angular/core";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { ActivatedRoute, Router } from "@angular/router";
import { DecimalPipe } from "@angular/common";
import { TargetSummary } from "../models/target";
import { AbstractListPager, RowCaller } from "./list-modifier.components";
import { Seen, ShortRating } from "../../shared/models/ratings";

export abstract class AbstractListComponent<SR extends ShortRating, ListPager extends AbstractListPager<Item>, Item extends TargetSummary<SR>> implements OnInit, RowCaller {

  @ViewChild('listTable') listTable : DatatableComponent;
  @ViewChild('pager') listPager : ListPager;

  public requiredColumns = [];
  public availableColumns = [];

  public columns = [];
  public selected = [];
  public items : Item[];

  protected numberPipe : DecimalPipe;

  constructor(private route : ActivatedRoute,
              private router : Router) {
    this.numberPipe = new DecimalPipe('en-US');
  }

  ngOnInit() : void {
    this.requiredColumns = this.getRequiredColumns();
    this.availableColumns = this.getAvailableColumns();
  }

  /**
   * A new list is available to use in the table.
   * @param items The items
   */
  onNewList(items : Item[]) {
    this.items = this.listPager.sort(items);
  }

  /**
   * Set the columns that are used in the table.
   * @param columns The columns
   */
  setColumns(columns) : void {
    this.columns = columns;
  }

  /**
   * A row has been selected.
   *
   * @param selected The selected item
   */
  onSelect({selected}) {
    this.router.navigate([selected[0].id], {relativeTo: this.route});
  }

  onSort(event) : void {
    const sort = event.sorts[0];
    this.items = this.listPager.onSort(sort.prop, sort.dir, this.items);
  }

  /**
   * Scroll to a certian row in a DataTable.
   * @param row The row
   */
  goToRow(row : number) : void {
    const bodyComponent = this.listTable.bodyComponent;
    const offset = bodyComponent.rowHeightsCache.query(row - 1);
    bodyComponent.scroller.setOffset(offset);
  }

  representativeRating(rating : SR) : string {
    if (!rating) {
      return "N/A";
    }

    switch (rating.seen) {
      case Seen.YES: //Yes
        if (rating.rating == null) {
          return "?";
        } else {
          return this.numberPipe.transform(rating.rating, '1.1-1');
        }

      case Seen.NO: //No
        return "Nee";

      case Seen.TELEVISION:
        return "TV";

      case Seen.UNKNOWN:
      default:
        return "Ja?";
    }
  }

  getCaller() : RowCaller {
    return this;
  }

  protected abstract getRequiredColumns() : any[];

  protected abstract getAvailableColumns() : any[];

}
