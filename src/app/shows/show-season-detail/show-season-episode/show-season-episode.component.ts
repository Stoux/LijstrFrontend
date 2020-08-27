import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShowDetail, ShowEpisodeComment, ShowEpisodeDetail, ShowEpisodeUserMeta, ShowSeasonDetail } from '../../models/show';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowDetailService } from '../../services/show-detail.service';
import { Observable} from 'rxjs';
import { ShowSeenStatusService } from '../../services/show-seen-status.service';
import { tap } from 'rxjs/operators';
import { EmojiData } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { User } from '../../../core/models/user';
import { UserService } from '../../../core/services/user.service';
import { SubmitEvent } from '../../../shared/components/editor/editor.component';

@Component({
  selector: 'lijstr-show-season-episode',
  templateUrl: './show-season-episode.component.html',
  styleUrls: ['./show-season-episode.component.scss']
})
export class ShowSeasonEpisodeComponent implements OnInit, AfterViewInit {

  @ViewChild('body') bodyElement: ElementRef<HTMLDivElement>;

  show: ShowDetail;
  season: ShowSeasonDetail;
  episode: ShowEpisodeDetail;

  private episodeNumber: string;

  notSeenPreviousEpisodes: number;
  userMeta: ShowEpisodeUserMeta;
  showReactionPicker: boolean;
  showUsers: User[];

  forceVisibleSummary: boolean;
  isShowUser: boolean;
  currentUserId: number;
  showCommentForm: boolean;

  comments: ShowEpisodeComment[];
  commentsPage = 0;
  totalCommentPages = 1;
  loadingComments: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private showService: ShowDetailService,
    private seenStatusService: ShowSeenStatusService,
    private userService: UserService,
  ) {
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
      this.forceVisibleSummary = false;
      this.showReactionPicker = false;
      this.showCommentForm = false;
      this.loadingComments = false;
      this.resolveEpisode();
    });
    this.route.data.subscribe((data: {userMeta: ShowEpisodeUserMeta, users: User[]}) => {
      this.userMeta = data.userMeta;
      this.showUsers = data.users;
    });
    this.isShowUser = this.userService.isShowUser();
    this.currentUserId = this.userService.getCurrentUserId();
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

    // Fetch first comments
    // TODO: Move first page of comments to route resolver
    this.commentsPage = -1;
    this.fetchPageOfComments();
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
      this.seenStatusService.invalidateSeenStatus(this.show.id);
    });
  }

  markAsNotSeen(): void {
    this.notSeenPreviousEpisodes = undefined;
    this.updateMeta(false, this.userMeta.reaction).subscribe(() => {});
  }

  onClickedReactionEmoji(event: {emoji: EmojiData, $event: MouseEvent}) {
    this.showReactionPicker = false;
    this.updateReaction(event.emoji.colons);
  }

  /**
   * @param emoji :colons: name
   */
  updateReaction(emoji: string): void {
    this.updateMeta(this.userMeta.seen, emoji).subscribe(() => {});
  }

  private updateMeta(seen: boolean, reaction: string): Observable<ShowEpisodeUserMeta> {
    const updateObservable = this.showService.updateEpisodeUserMeta(this.show.id, this.season.seasonNumber, this.episode.episodeNumber, {
      seen, reaction
    });

    return updateObservable.pipe(
      tap(meta => {
        this.userMeta = meta;
        this.seenStatusService.invalidateSeenStatus(this.show.id);
      })
    );
  }

  public getAllReactions() {
    return this.episode.userMetas
      .filter(meta => meta.seen)
      .filter(meta => !this.userMeta || this.userMeta.user !== meta.user)
      .map(meta => {
      return {
        meta,
        user: this.showUsers.find(user => user.id === meta.user),
      };
    });
  }

  public fetchPageOfComments() {
    this.commentsPage++;
    this.loadingComments = true;
    this.showService.getComments(this.episode.id, this.commentsPage).subscribe(page => {
      if (this.comments === undefined) {
        this.comments = page.content;
      } else {
        this.comments.push(...page.content);
      }
      this.totalCommentPages = page.totalPages;
      this.loadingComments = false;
    });
  }

  public async onSubmitComment(event: SubmitEvent) {
    const comment = await this.showService.placeComment(this.episode.id, {
      comment: event.data,
      spoilers: event.isSpoiler,
    }).toPromise();

    // Prepend the comment to the list
    this.comments.unshift(comment);

    this.showCommentForm = false;
    event.unlockButton(true);
  }

  public getUserName(userId: number) {
    const found = this.showUsers.find(user => user.id === userId);
    return found ? found.displayName : '?';
  }

  get hideSpoilers(): boolean {
    return (this.userMeta && !this.userMeta.seen) && !this.forceVisibleSummary && !!this.episode.overview;
  }


  public goToPreviousEpisode() {
    // TODO: Optimize this?
    // TODO: Load this on episode load to hide/show buttons
    let previousEpisodeSeason;
    let previousEpisode;
    for (const season of this.show.seasonsIncludingSpecials) {
      for (const episode of season.episodes) {
        if (episode.id === this.episode.id) {
          this.navigateToEpisode(previousEpisodeSeason, previousEpisode);
          return;
        } else {
          previousEpisodeSeason = season;
          previousEpisode = episode;
        }
      }
    }
  }

  public goToNextEpisode() {
    // TODO: Optimize this?
    // TODO: Load this on episode load to hide/show buttons
    let nextEpisode = false;
    for (const season of this.show.seasonsIncludingSpecials) {
      for (const episode of season.episodes) {
        if (nextEpisode) {
          this.navigateToEpisode(season, episode);
          return;
        }

        if (episode.id === this.episode.id) {
          nextEpisode = true;
        }
      }
    }
  }

  private navigateToEpisode(season: ShowSeasonDetail, episode: ShowEpisodeDetail) {
    if (season === undefined || episode === undefined) {
      return;
    }

    this.router.navigate([
      'shows', this.show.id,
      'seasons', season.seasonNumber,
      'episodes', episode.episodeNumber
    ]);
  }


}
