import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Observable } from 'rxjs';
import { ShowDetail } from '../models/show';

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

}
