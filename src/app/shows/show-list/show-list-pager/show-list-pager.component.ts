import { Component, OnInit } from '@angular/core';
import { ShowSummary } from "../../models/show";
import { AbstractListPager } from "../../../abs/list/pager/list-pager.component";

@Component({
  selector: 'lijstr-show-list-pager',
  templateUrl: './../../../abs/list/pager/list-pager.component.html',
  styleUrls: ['./../../../abs/list/pager/list-pager.component.css']
})
export class ShowListPagerComponent extends AbstractListPager<ShowSummary> {

  protected getKeyMethod(forProp : string) : (item : ShowSummary) => string {
    return null;
  }

}
