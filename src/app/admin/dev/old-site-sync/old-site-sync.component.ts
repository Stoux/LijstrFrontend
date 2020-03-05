import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'lijstr-old-site-sync',
  templateUrl: './old-site-sync.component.html'
})
export class OldSiteSyncComponent implements OnInit, OnDestroy {

  started: boolean;
  finished: boolean;
  error: any;
  result: any;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.fetch();
  }

  startSync() {
    if (this.started) { return; }
    this.started = true;

    this.api.post('/movies/migrate').subscribe(
      (result: any) => {
        if (result.newMigration) {
          this.fetch();
        }
      }
    );

  }

  fetch() {
    this.api.get('/movies/migrate').subscribe(
      ( result: any ) => {
        if (!this.finished && result.progress != null) {
          this.started = true;
          this.result = result;
          if (result.progress.finished) {
            this.finished = true;
            this.api.del('/movies/migrate');
          } else {
            setTimeout(() => this.fetch(), 2500);
          }
        }
      },
      error => {
        this.error = error;
      }
    );
  }

  ngOnDestroy(): void {
    this.finished = true;
  }

}
