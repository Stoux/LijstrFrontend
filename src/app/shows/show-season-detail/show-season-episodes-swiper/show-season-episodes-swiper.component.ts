import { Component, Input, OnInit } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { ShowEpisodeDetail, ShowSeasonDetail } from '../../models/show';
import { ActivatedRoute, Router } from '@angular/router';
import { SeenMap } from '../../services/show-seen-status.service';

@Component({
  selector: 'lijstr-show-season-episodes-swiper',
  templateUrl: './show-season-episodes-swiper.component.html',
  styleUrls: ['./show-season-episodes-swiper.component.css']
})
export class ShowSeasonEpisodesSwiperComponent implements OnInit {

  @Input() season: ShowSeasonDetail;
  @Input() seenMap: SeenMap;

  config: SwiperConfigInterface = {
    direction: 'horizontal',
    allowTouchMove: true,
    grabCursor: true,
    autoplay: false,
    centeredSlides: false,
    slidesPerView: 'auto',
    centerInsufficientSlides: false,
    slidesOffsetBefore: 200,
    // slidesOffsetAfter: 542,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
  };

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
  }

  public getPosterURL(): string {
    const size = 'w500';
    return `https://image.tmdb.org/t/p/${size}${this.season.posterImage}`;
  }

  public toEpisode(episode: ShowEpisodeDetail) {
    this.router.navigate([ 'episodes', episode.episodeNumber ], {
      relativeTo: this.route,
    });
  }

  public hasSeenEpisode(episode: ShowEpisodeDetail) {
    if (!this.seenMap || !this.seenMap.hasOwnProperty(this.season.id)) {
      return false;
    }

    const episodes = this.seenMap[this.season.id];
    return episodes.hasOwnProperty(episode.id) ? episodes[episode.id] : false;
  }


}
