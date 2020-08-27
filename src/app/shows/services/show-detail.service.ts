import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Observable, pipe } from 'rxjs';
import { ShowDetail, ShowEpisodeComment, ShowEpisodeUserMeta, ShowSeasonDetail } from '../models/show';
import { QuillOperations } from '../../shared/config/quill-config';
import { Page } from '../../shared/classes/paging';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShowDetailService {

  constructor(private api: ApiService) { }

  /**
   *
   * @param showId The show's ID
   */
  getShowDetail(showId: number): Observable<ShowDetail> {
    return this.api.get(this.buildPath(showId));
  }

  /**
   * @param showId The show's ID
   * @param seasonNumber Chronological season number
   */
  getSeasonDetail(showId: number, seasonNumber: number): Observable<ShowSeasonDetail> {
    return this.api.get(this.buildPath(showId, seasonNumber));
  }

  /**
   * Fetch the current user's meta of an episode.
   */
  getEpisodeUserMeta(showId: number, seasonNumber: number, episodeNumber: number): Observable<ShowEpisodeUserMeta> {
    return this.api.get(`${this.buildPath(showId, seasonNumber, episodeNumber)}/meta`);
  }

  /**
   * Update the current user's meta of an episode.
   */
  updateEpisodeUserMeta(showId: number, seasonNumber: number, episodeNumber: number, data: { seen: boolean, reaction: string }):
    Observable<ShowEpisodeUserMeta> {
    return this.api.put(`${this.buildPath(showId, seasonNumber, episodeNumber)}/meta`, data);
  }

  /**
   * Check if the current has any episodes before the given one that they haven't seen yet.
   * @return Number of episodes they haven't seen
   */
  checkForNotSeenEpisodes(showId: number, seasonNumber: number, episodeNumber: number): Observable<number> {
    return this.api.get(`${this.buildPath(showId, seasonNumber, episodeNumber)}/check-not-seen`);
  }

  /**
   * Update all episodes before the given one to 'seen'.
   */
  updateNotSeenEpisodes(showId: number, seasonNumber: number, episodeNumber: number): Observable<void> {
    return this.api.put(`${this.buildPath(showId, seasonNumber, episodeNumber)}/update-not-seen`);
  }

  /**
   * Add a comment to the given show as the current user.
   */
  placeComment(episodeId: number, data: { comment: QuillOperations, spoilers?: boolean }): Observable<ShowEpisodeComment> {
    return this.api.post<ShowEpisodeComment>(`/shows/episodes/${episodeId}/comments`, {
      comment: JSON.stringify(data.comment),
      spoilers: data.spoilers,
    }).pipe(
      tap(comment => ShowDetailService.transformCommentToOps(comment))
    );
  }

  /**
   * Fetch comments for a given episode
   * @param episodeId ID of the episode (not number)
   * @param page The page to fetch (zero indexed)
   * @param limit Number of items per page
   */
  getComments(episodeId: number, page: number = 0, limit: number = 5 ): Observable<Page<ShowEpisodeComment>> {
    return this.api.get<Page<ShowEpisodeComment>>(`/shows/episodes/${episodeId}/comments`, true, {
      page,
      perPage: limit,
    }).pipe(
      tap(result => {
        result.content.forEach(ShowDetailService.transformCommentToOps);
      })
    );
  }

  private static transformCommentToOps(comment: ShowEpisodeComment): void {
    if (typeof comment.comment === 'string') {
      const result = JSON.parse(comment.comment as string);
      if (result && result.ops) {
        comment.comment = result as QuillOperations;
      }
    }
  }




  private buildPath(showId: number, seasonNumber?: number, episodeNumber?: number): string {
    let result = `/shows/${showId}`;
    if (seasonNumber !== undefined) {
      result += `/seasons/${seasonNumber}`;
    }
    if (episodeNumber !== undefined) {
      result += `/episodes/${episodeNumber}`;
    }
    return result;
  }


}
