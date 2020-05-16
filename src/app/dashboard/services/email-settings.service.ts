import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Observable } from 'rxjs';
import { DayOfWeek, EmailSettings, UpdateInterval } from '../../core/models/user';

@Injectable({
  providedIn: 'root'
})
export class EmailSettingsService {

  constructor(private api: ApiService) {
  }

  /**
   * Fetch the current user's email settings.
   * Requires MOVIE_USER perm.
   */
  get(): Observable<EmailSettings> {
    return this.api.get('/users/email-settings/me');
  }

  /**
   * Calculate a new date for the current user.
   * @param request Interval params
   */
  calculate(request: UpdateIntervalRequest): Observable<number> {
    return this.api.get('/users/email-settings/me/calculate', true, request);
  }

  /**
   * Update the Interval Request for the current user.
   * @param request Interval params
   */
  update(request: UpdateIntervalRequest): Observable<EmailSettings> {
    return this.api.get('/users/email-settings/me/update', true, request);
  }

  /**
   * Fetch the email settings for the given user.
   * @param userId ID of the user
   */
  getForUser(userId: number): Observable<EmailSettings> {
    return this.api.get(`/users/email-settings/${userId}`);
  }

}

/**
 * Model for requesting an update to the update interval.
 */
export interface UpdateIntervalRequest {

  updateInterval: string;
  dayOfWeek?: string;
  dayOfMonth?: number;

}
