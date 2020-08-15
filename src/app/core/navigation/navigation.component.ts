import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { MovieOutstandingService } from '../services/section/movie-outstanding.service';

@Component({
  selector: 'lijstr-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  isCollapsed: boolean;
  name: string;
  loggedIn: boolean;
  admin: boolean;
  movieUser: boolean;
  movieMod: boolean;

  outstandingMovies: number;

  constructor(public userService: UserService,
              private movieService: MovieOutstandingService) {
  }

  ngOnInit(): void {
    this.loggedIn = false;
    this.admin = false;
    this.isCollapsed = true;
    this.outstandingMovies = null;

    this.userService.userChangeFeed()
      .subscribe(user => {
        this.loggedIn = this.userService.isLoggedIn();
        this.admin = this.userService.isAdmin();
        this.movieUser = this.userService.isMovieUser();
        this.movieMod = this.userService.isMovieMod();
        this.name = (user == null ? null : user.displayName);
      });

    this.movieService.getOutstandingCount().subscribe(
      count => this.outstandingMovies = count
    );
  }

  toggleMenu() {
    this.isCollapsed = !this.isCollapsed;
  }

  collapseMenu() {
    this.isCollapsed = true;
  }

}
