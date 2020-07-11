import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Observable } from 'rxjs';
import { ShowDetail, ShowEpisodeUserMeta, ShowSeasonDetail } from '../models/show';

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
