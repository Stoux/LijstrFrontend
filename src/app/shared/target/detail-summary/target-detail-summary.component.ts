import { Component, OnInit, Input } from '@angular/core';
import { MovieDetail } from "../../../movies/models/movie";
import { TargetDetail } from "../../../abs/models/target";
import { ShortRating } from "../../models/ratings";

@Component({
  selector: 'lijstr-target-detail-summary',
  templateUrl: './target-detail-summary.component.html',
  styleUrls: ['./target-detail-summary.component.css']
})
export class TargetDetailSummaryComponent {

  @Input() target : TargetDetail<ShortRating>;
  shortPlot : boolean;

  constructor() {
    this.shortPlot = true;
  }

  switchPlotSize() {
    this.shortPlot = !this.shortPlot;
  }

}
