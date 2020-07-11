import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ShowEpisodeUserMeta } from '../../models/show';
import { UserService } from '../../../core/services/user.service';
import { Observable } from 'rxjs';
import { ShowDetailService } from '../../services/show-detail.service';

@Injectable({
  providedIn: 'root'
})
export class ShowEpisodeUserMetaResolver implements Resolve<ShowEpisodeUserMeta> {

  constructor(private userService: UserService, private showService: ShowDetailService) {  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ShowEpisodeUserMeta> {
    if (!this.userService.isShowUser()) {
      return undefined;
    }

    console.log(route.params, route.paramMap);
    const current = route.params;
    const parent = route.parent.params;

    return this.showService.getEpisodeUserMeta(
      parent.showId, parent.seasonNumber, current.episodeNumber
    );
  }
}
