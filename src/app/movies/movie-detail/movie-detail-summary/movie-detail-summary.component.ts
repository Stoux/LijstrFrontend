import { Component, OnInit, Input } from '@angular/core';
import { MovieDetail } from '../../models/movie';

@Component({
  selector: 'lijstr-movie-detail-summary',
  templateUrl: './movie-detail-summary.component.html',
  styleUrls: ['./movie-detail-summary.component.scss']
})
export class MovieDetailSummaryComponent {

  @Input() movie: MovieDetail;
  shortPlot: boolean;

  constructor() {
    this.shortPlot = true;
  }

  switchPlotSize() {
    this.shortPlot = !this.shortPlot;
  }

}
