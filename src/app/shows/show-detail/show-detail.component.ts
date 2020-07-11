import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShowDetail } from '../models/show';
import { SeenMap, ShowSeenStatusService } from '../services/show-seen-status.service';

@Component({
  selector: 'lijstr-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrls: ['./show-detail.component.css']
})
export class ShowDetailComponent implements OnInit {

  public show: ShowDetail;
  public seenStatus: SeenMap;

  constructor(
    private route: ActivatedRoute,
    private seenStatusService: ShowSeenStatusService
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: {showDetail: ShowDetail}) => {
        this.show = data.showDetail;
        this.seenStatusService.getSeenStatus(this.show.id).subscribe(map => this.seenStatus = map);
      }
    );
  }

  public getPosterURL(): string {
    const size = 'w500';
    return `https://image.tmdb.org/t/p/${size}${this.show.posterImage}`;
  }

  public getImdbUrl(): string {
    return `https://www.imdb.com/title/${this.show.imdbId}/`;
  }


}
