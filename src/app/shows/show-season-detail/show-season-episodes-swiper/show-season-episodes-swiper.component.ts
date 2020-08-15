import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { SwiperComponent, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { ShowEpisodeDetail, ShowSeasonDetail } from '../../models/show';
import { ActivatedRoute, Router } from '@angular/router';
import { SeenMap } from '../../services/show-seen-status.service';

@Component({
  selector: 'lijstr-show-season-episodes-swiper',
  templateUrl: './show-season-episodes-swiper.component.html',
  styleUrls: ['./show-season-episodes-swiper.component.scss']
})
export class ShowSeasonEpisodesSwiperComponent implements OnInit, OnChanges, AfterViewInit {

  @ViewChild('swiper') swiper: SwiperComponent;

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
    slidesOffsetBefore: 542,
    slidesOffsetAfter: 542,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
  };

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    const seenMap = changes.seenMap;
    if (seenMap.currentValue && this.swiper) {
      this.slideToFirstNotSeen();
    }

  }

  ngAfterViewInit() {
    this.slideToFirstNotSeen();
  }

  private slideToFirstNotSeen() {
    if (!this.swiper || !this.seenMap || !this.seenMap.hasOwnProperty(this.season.id)) {
      return;
    }

    const seenMap = this.seenMap[this.season.id];
    let index = 0;
    for (const episode of this.season.episodes) {
      if (!seenMap.hasOwnProperty(episode.id) || seenMap[episode.id] === false) {
        this.swiper.directiveRef.setIndex(index);
      }
      index++;
    }
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
