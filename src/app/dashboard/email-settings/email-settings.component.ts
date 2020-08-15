import { Component, OnInit } from '@angular/core';
import { EmailSettingsService, UpdateIntervalRequest } from '../services/email-settings.service';
import { DayOfWeek, EmailSettings, UpdateInterval } from '../../core/models/user';

@Component({
  selector: 'lijstr-email-settings',
  templateUrl: './email-settings.component.html',
  styleUrls: ['./email-settings.component.scss']
})
export class EmailSettingsComponent implements OnInit {

  public settings?: EmailSettings;
  public error?: any;

  public useWeekDay: boolean;
  public nextDate?: number;
  public calculating = false;
  public updating = false;
  public showUpdateMessage = false;

  constructor(private api: EmailSettingsService) {
    this.useWeekDay = true;
  }

  ngOnInit(): void {
    this.api.get().toPromise()
      .then(emailSettings => {
        this.settings = emailSettings;
        if (emailSettings.updateInterval === UpdateInterval.Monthly) {
          this.useWeekDay = !emailSettings.preferredDayOfMonth;
        }
      })
      .catch(reason => {
        this.error = reason;
      });
  }

  /**
   * Calculate a new nextDate
   */
  calculate() {
    if (this.updating) {
      return;
    }

    this.calculating = true;
    this.error = null;

    // TODO: Don't override nextDate / calculating if a new request has been made
    this.api.calculate(this.getRequestData()).toPromise()
      .then(value => {
        this.nextDate = value;
      })
      .catch(error => this.error = error)
      .finally(() => this.calculating = false);
  }

  private getRequestData(): UpdateIntervalRequest {
    const request: UpdateIntervalRequest = {
      updateInterval: this.settings.updateInterval.toString(),
    };
    if (this.isMonthly() && !this.useWeekDay) {
      request.dayOfMonth = this.settings.preferredDayOfMonth;
    } else {
      request.dayOfWeek = this.settings.preferredDayOfWeek.toString();
    }

    console.log(request);

    return request;
  }

  onSubmit(event: any): void {
    this.updating = true;
    this.error = null;
    this.api.update(this.getRequestData()).toPromise()
      .then(settings => {
        this.settings = settings;
        this.nextDate = null;
        this.showUpdateMessage = true;
        setTimeout(() => this.showUpdateMessage = false, 5000);
      })
      .catch(error => this.error = error)
      .finally(() => this.updating = false);
  }

  /**
   * Check if the current interval is monthly.
   */
  isMonthly() {
    return this.settings && this.settings.updateInterval === UpdateInterval.Monthly;
  }

  getWeekDays() {
    return Object.values(DayOfWeek);
  }

  getUpdateIntervals() {
    return Object.values(UpdateInterval);
  }

  translate(item): string {
    switch (item) {
      case DayOfWeek.Monday: return 'Maandag';
      case DayOfWeek.Tuesday: return 'Disndag';
      case DayOfWeek.Wednesday: return 'Woensdag';
      case DayOfWeek.Thursday: return 'Donderdag';
      case DayOfWeek.Friday: return 'Vrijdag';
      case DayOfWeek.Saturday: return 'Zaterdag';
      case DayOfWeek.Sunday: return 'Zondag';
      case UpdateInterval.Weekly: return 'Eens per week';
      case UpdateInterval.Fortnight: return 'Eens per twee weken';
      case UpdateInterval.Monthly: return 'Eens per maand';
      default: return '';
    }
  }

}
