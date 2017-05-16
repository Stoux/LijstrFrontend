import { Component, OnInit, Input } from '@angular/core';
import { MovieDetail } from "../../../movies/models/movie";
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'lijstr-target-detail-poster',
  templateUrl: './target-detail-poster.component.html',
  styleUrls: ['./target-detail-poster.component.css']
})
export class TargetDetailPosterComponent {

  @Input() target : MovieDetail;
  @Input() path : string;

  constructor() { }

  getPosterURL() : string {
    return "http" + (environment.endpointSSL ? "s" : "") + "://" + environment.endpoint +
      "/" + this.path + "/" + this.target.id + "/poster";
  }

}
