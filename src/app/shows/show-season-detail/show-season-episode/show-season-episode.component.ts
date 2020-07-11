import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShowDetail, ShowEpisodeDetail, ShowEpisodeUserMeta, ShowSeasonDetail } from '../../models/show';
import { ActivatedRoute } from '@angular/router';
import { ShowDetailService } from '../../services/show-detail.service';
import { Observable} from 'rxjs';

@Component({
  selector: 'lijstr-show-season-episode',
  templateUrl: './show-season-episode.component.html',
  styleUrls: ['./show-season-episode.component.css']
})
export class ShowSeasonEpisodeComponent implements OnInit, AfterViewInit {

  @ViewChild('body') bodyElement: ElementRef<HTMLDivElement>;

  show: ShowDetail;
  season: ShowSeasonDetail;
  episode: ShowEpisodeDetail;

  private episodeNumber: string;

  notSeenPreviousEpisodes: number;
  userMeta: ShowEpisodeUserMeta;
  comments: any[];

  constructor(private route: ActivatedRoute, private showService: ShowDetailService) {
  }

  ngOnInit(): void {
    this.route.parent.data.subscribe(      (data: {show: ShowDetail, season: ShowSeasonDetail}) => {
      this.show = data.show;
      this.season = data.season;
      this.resolveEpisode();
    });
    this.route.params.subscribe((params: {episodeNumber: string}) => {
      this.episodeNumber = params.episodeNumber;
      this.comments = undefined;
      this.notSeenPreviousEpisodes = undefined;
      this.resolveEpisode();
    });
    this.route.data.subscribe((data: {userMeta: ShowEpisodeUserMeta}) => {
      this.userMeta = data.userMeta;
    });
  }


  private resolveEpisode() {
    // Not all data is resolved yet.
    if (this.season === undefined || this.episodeNumber === undefined) {
      return;
    }

    // Resolve the episode from the episode list
    const episodeNumber = Number(this.episodeNumber);
    for (const episode of this.season.episodes) {
      if (episode.episodeNumber === episodeNumber) {
        this.episode = episode;
        break;
      }
    }
  }

  ngAfterViewInit(): void {
    // TODO: Maybe remove?
    this.bodyElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  markAsSeen(): void {
    this.updateMeta(true, this.userMeta.reaction).subscribe(meta => {
      // Check for 'not seen' episodes before the current one.
      // TODO: Check if they have previous checks disabled
      if (meta.seen) {
        this.showService.checkForNotSeenEpisodes(this.show.id, this.season.seasonNumber, this.episode.episodeNumber).subscribe(
          notSeenEpisodes => {
            if (notSeenEpisodes > 0) {
              this.notSeenPreviousEpisodes = notSeenEpisodes;
            }
          }
        );
      }
    });
  }

  markPreviousEpisodesAsSeen(): void {
    this.showService.updateNotSeenEpisodes(this.show.id, this.season.seasonNumber, this.episode.episodeNumber).subscribe(() => {
      this.notSeenPreviousEpisodes = undefined;
    });
  }

  markAsNotSeen(): void {
    this.notSeenPreviousEpisodes = undefined;
    this.updateMeta(false, this.userMeta.reaction);
  }

  // updateReaction(reaction): void {
  //   this.updateMeta(this.userMeta.seen, reaction);
  // }

  private updateMeta(seen: boolean, reaction: string): Observable<ShowEpisodeUserMeta> {
    const updateObservable = this.showService.updateEpisodeUserMeta(this.show.id, this.season.seasonNumber, this.episode.episodeNumber, {
      seen, reaction
    });

    updateObservable.subscribe(
      meta => this.userMeta = meta,
      error => console.log(error) // TODO
    );

    return updateObservable;
  }


}
