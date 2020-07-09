import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Observable } from 'rxjs';
import { ShowDetail, ShowSeasonDetail } from '../models/show';

@Injectable({
  providedIn: 'root'
})
export class ShowDetailService {

  constructor(private api: ApiService) { }

  /**
   *
   * @param id The show's ID
   */
  getShowDetail(id: number): Observable<ShowDetail> {
    return this.api.get(`/shows/${id}`);
  }

  /**
   * @param showId The show's ID
   * @param seasonNumber Chronological season number
   */
  getSeasonDetail(showId: number, seasonNumber: number): Observable<ShowSeasonDetail> {
    return this.api.get(`/shows/${showId}/seasons/${seasonNumber}`);
  }

}
