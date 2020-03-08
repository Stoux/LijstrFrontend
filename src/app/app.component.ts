import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TitleService } from './core/services/title.service';
import { AuthService } from './core/services/auth.service';
import {filter, flatMap, map, mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private titleApi: TitleService) {
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(x => x instanceof NavigationEnd), // Only trigger when navigation has finished
      map(() => this.activatedRoute), // Replace the event with the activated route
      flatMap(route => { // Include all the sub-routes as well
        const withChildren = [route];
        let current = route;
        while (current.firstChild) {
          current = current.firstChild;
          withChildren.push(current);
        }
        return withChildren;
      }),
      filter(route => route.outlet === 'primary'), // Only care about the main outlet
      mergeMap(route => route.data) // Get the data
    ).subscribe(event => {
        if (event.title) { // Check if title data value is set
          this.titleApi.setTitle(event.title);
        } else if (event.resolveTitle) { // Try to resolve it if path is set
          if (typeof event.resolveTitle === 'function') {
            const title: any = event.resolveTitle(event);
            this.titleApi.setTitle(title);
          } else {
            const splitPath: string[] = event.resolveTitle.split('.');
            let value = event;
            for (const path of splitPath) {
              value = value[path];
            }
            if (value !== event && event !== null) {
              this.titleApi.setTitle(value.toString());
            }
          }
        }
      });
  }

  @HostListener('document:visibilitychange', ['$event'])
  onVisibilityChange(event: any): void {
    if (event.target.visibilityState === 'visible') {
      this.authService.validateToken();
    }
  }

}
