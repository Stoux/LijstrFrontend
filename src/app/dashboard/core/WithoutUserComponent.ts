import { OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../../core/services/user.service';
import { Router } from '@angular/router';
import { RedirectService } from '../../core/services/redirect.service';
import {filter} from 'rxjs/operators';

export abstract class WithoutUserComponent implements OnInit, OnDestroy {

  private userSubscription: Subscription;

  constructor(protected userService: UserService,
              protected router: Router,
              protected redirect: RedirectService) {
  }

  ngOnInit(): void {
    this.userSubscription = this.userService.userChangeFeed()
      .pipe(filter(x => x != null))
      .subscribe(
        user => {
          this.redirectRoute();
        }
      );
  }

  ngOnDestroy(): void {
    this.unsubscribeUserFeed();
  }

  protected redirectRoute() {
    if (this.redirect.hasUrl()) {
      const url = this.redirect.popUrl();
      this.router.navigate([url]);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  protected unsubscribeUserFeed() {
    if (this.userSubscription != null) {
      this.userSubscription.unsubscribe();
      this.userSubscription = null;
    }
  }

}
