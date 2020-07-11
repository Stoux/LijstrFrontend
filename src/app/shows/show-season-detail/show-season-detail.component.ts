import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowDetail, ShowSeasonDetail } from '../models/show';

@Component({
  selector: 'lijstr-show-season-detail',
  templateUrl: './show-season-detail.component.html',
  styleUrls: ['./show-season-detail.component.css']
})
export class ShowSeasonDetailComponent implements OnInit {

  public show: ShowDetail;
  public season: ShowSeasonDetail;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: {show: ShowDetail, season: ShowSeasonDetail}) => {
        this.show = data.show;
        this.season = data.season;
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

}
