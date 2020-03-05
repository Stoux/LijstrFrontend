import { Component, OnInit, TemplateRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../../core/models/user';
import { MovieUsersService } from '../../services/movie-users.service';
import { LijstrException } from '../../../core/exceptions';
import { SavedMovieRequest } from '../../models/requests';

@Component({
  selector: 'lijstr-movie-request-list',
  templateUrl: './movie-request-list.component.html',
  styleUrls: ['./movie-request-list.component.css']
})
export class MovieRequestListComponent implements OnInit {

  @Input() outstandingRequests: SavedMovieRequest[];
  @Input() error: string;
  @Input() selectable: boolean;
  @Output() selected = new EventEmitter<SavedMovieRequest[]>();

  @ViewChild('valueCell') valueCell: TemplateRef<any>;
  @ViewChild('titleCell') titleCell: TemplateRef<any>;
  @ViewChild('dateCell') dateCell: TemplateRef<any>;
  @ViewChild('userCell') userCell: TemplateRef<any>;
  columns: any[];
  users: User[];

  constructor(private usersService: MovieUsersService) {
    this.columns = [];
  }

  ngOnInit() {
    this.usersService.getPromisedUsers().subscribe(
      (users: User[]) => this.users = users,
      (error: LijstrException) => this.error = error.toString()
    );

    this.columns = [
      {name: 'Aangevraagde film', prop: 'title', flexGrow: 3, cellTemplate: this.titleCell},
      {name: 'Jaar', prop: 'year', flexGrow: 1},
      {name: 'IMDB', prop: 'imdbRating', flexGrow: 1},
      {name: 'Door', prop: 'requestedBy', flexGrow: 1, cellTemplate: this.userCell},
      {name: 'Wanneer', prop: 'created', flexGrow: 1, cellTemplate: this.dateCell}
    ];
  }

  onSelected(selected: SavedMovieRequest[]) {
    this.selected.emit(selected);
  }

  /**
   * Get the user's display name.
   * @param userId The ID of the user
   * @returns Display name
   */
  getUserDisplayName(userId: number): string {
    if (this.users != null) {
      for (const user of this.users) {
        if (user.id == userId) {
          return user.displayName;
        }
      }
    }
    return 'Onbekend';
  }

}
