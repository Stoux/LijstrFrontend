import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShowDetail } from '../models/show';

@Component({
  selector: 'lijstr-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrls: ['./show-detail.component.css']
})
export class ShowDetailComponent implements OnInit {

  public show: ShowDetail;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: {showDetail: ShowDetail}) => {
        this.show = data.showDetail;
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
