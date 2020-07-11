import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowDetail, ShowSeasonDetail } from '../models/show';
import { SeenMap, ShowSeenStatusService } from '../services/show-seen-status.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'lijstr-show-season-detail',
  templateUrl: './show-season-detail.component.html',
  styleUrls: ['./show-season-detail.component.css']
})
export class ShowSeasonDetailComponent implements OnInit {

  public show: ShowDetail;
  public season: ShowSeasonDetail;

  public seenMap: SeenMap;
  public showingEpisode = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private seenStatusService: ShowSeenStatusService
  ) { }

  ngOnInit(): void {
    console.log(this.route.children);
    this.route.data.subscribe(
      (data: {show: ShowDetail, season: ShowSeasonDetail}) => {
        this.show = data.show;
        this.season = data.season;
        this.seenStatusService.getSeenStatus(this.show.id).subscribe(value => this.seenMap = value);
      }
    );
  }

  public getPosterURL(): string {
    const size = 'w500';
    return `https://image.tmdb.org/t/p/${size}${this.season.posterImage}`;
  }

  public backToShow(event?: MouseEvent): void {
    if (event !== undefined) {
      event.preventDefault();
    }

    this.router.navigate(['shows', this.show.id]);
  }

  public backToSeason(event?: MouseEvent) {
    if (event !== undefined) {
      event.preventDefault();
    }

    this.router.navigate([ '.' ], {
      relativeTo: this.route,
    });
  }


}
