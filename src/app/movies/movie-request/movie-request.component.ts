import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { MovieRequestService } from "../services/movie-request.service";
import { UserService } from "../../core/services/user.service";
import { SavedMovieRequest } from "../models/requests";
import { LijstrException } from "../../core/exceptions";
import { Subscription, Observable } from "rxjs";
import { FullUser, User } from "../../core/models/user";

@Component({
  selector: 'lijstr-movie-request',
  templateUrl: './movie-request.component.html',
  styleUrls: ['./movie-request.component.css']
})
export class MovieRequestComponent implements OnInit, OnDestroy {

  outstandingRequests : SavedMovieRequest[];
  outstandingRequestsError : string;

  selectedRequests : SavedMovieRequest[] = [];
  approving : {id : number, title: string, error : LijstrException, finished: boolean}[];
  submitting : boolean;

  private isMod : boolean;
  private userFeed : Subscription;

  constructor(private userService : UserService,
              private movieRequestService : MovieRequestService) { }

  ngOnInit() : void {
    this.isMod = false;
    this.submitting = false;
    this.fetchOutstandingRequests();

    this.userFeed = this.userService.userChangeFeed().subscribe(
      (user : FullUser) => this.isMod = this.userService.isMovieMod()
    );
  }

  ngOnDestroy() : void {
    this.userFeed.unsubscribe();
  }

  onSelected(selected : SavedMovieRequest[]) {
    this.selectedRequests = selected;
  }

  approve() {
    this.submitting = true;

    //Copy the list and remove the selected ones
    this.approving = [];
    for (let selected of this.selectedRequests) {
      this.approving.push({
        id: selected.id,
        title: selected.title,
        error: null,
        finished: false
      });
    }

    //Start publishing
    for (let approvingItem of this.approving) {
      this.movieRequestService.approveRequest(approvingItem.id)
        .finally(() => {
          approvingItem.finished = true;
          this.releaseSubmitHold();
        })
        .subscribe(
          x => x, //Succeeded, nothing to do
          (error : LijstrException) => approvingItem.error = error
        );
    }
  }

  private releaseSubmitHold() {
    for(let item of this.approving) {
      if (!item.finished) return;
    }

    this.outstandingRequests = [];
    this.selectedRequests = [];
    this.submitting = false;
    this.fetchOutstandingRequests();
  }

  private fetchOutstandingRequests() {
    this.movieRequestService.getOutstandingRequests().subscribe(
      (requests : SavedMovieRequest[]) => this.outstandingRequests = requests,
      (error : LijstrException) => this.outstandingRequestsError = error.toString()
    );
  }
}
