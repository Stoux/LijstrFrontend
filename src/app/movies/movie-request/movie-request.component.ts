import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieRequestService } from '../services/movie-request.service';
import { UserService } from '../../core/services/user.service';
import { SavedMovieRequest } from '../models/requests';
import { LijstrException } from '../../core/exceptions';
import { Subscription } from 'rxjs';
import { FullUser } from '../../core/models/user';
import { MovieOutstandingService } from '../../core/services/section/movie-outstanding.service';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'lijstr-movie-request',
  templateUrl: './movie-request.component.html',
  styleUrls: ['./movie-request.component.scss']
})
export class MovieRequestComponent implements OnInit, OnDestroy {

  outstandingRequests: SavedMovieRequest[];
  outstandingRequestsError: string;

  selectedRequests: SavedMovieRequest[] = [];
  approving: {id: number, title: string, error: LijstrException, finished: boolean}[];
  submitting: boolean;

  isMod: boolean;
  private userFeed: Subscription;

  constructor(private userService: UserService,
              private movieRequestService: MovieRequestService,
              private outstandingService: MovieOutstandingService) { }

  ngOnInit(): void {
    this.isMod = false;
    this.submitting = false;
    this.fetchOutstandingRequests();

    this.userFeed = this.userService.userChangeFeed().subscribe(
      (user: FullUser) => this.isMod = this.userService.isMovieMod()
    );
  }

  ngOnDestroy(): void {
    this.userFeed.unsubscribe();
  }

  onSelected(selected: SavedMovieRequest[]) {
    this.selectedRequests = selected;
  }

  approve() {
    this.submitting = true;

    // Copy the list and remove the selected ones
    this.approving = [];
    for (const selected of this.selectedRequests) {
      this.approving.push({
        id: selected.id,
        title: selected.title,
        error: null,
        finished: false
      });
    }

    // Start publishing
    for (const approvingItem of this.approving) {
      this.movieRequestService.approveRequest(approvingItem.id)
        .pipe(finalize(() => {
          approvingItem.finished = true;
          this.releaseSubmitHold();
        }))
        .subscribe(
          x => {
            this.outstandingService.increase();
            return x;
          },
          (error: LijstrException) => approvingItem.error = error
        );
    }
  }

  private releaseSubmitHold() {
    for (const item of this.approving) {
      if (!item.finished) { return; }
    }

    this.outstandingRequests = [];
    this.selectedRequests = [];
    this.submitting = false;
    this.fetchOutstandingRequests();
  }

  private fetchOutstandingRequests() {
    this.movieRequestService.getOutstandingRequests().subscribe(
      (requests: SavedMovieRequest[]) => this.outstandingRequests = requests,
      (error: LijstrException) => this.outstandingRequestsError = error.toString()
    );
  }
}
