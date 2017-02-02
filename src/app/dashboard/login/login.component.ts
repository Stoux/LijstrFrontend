import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthenticationRequest } from "../../core/models/authentication";
import { LoginService } from "../../core/services/login.service";
import { Observable } from "rxjs";
import { FullUser } from "../../core/models/user";
import { RedirectService } from "../../core/services/redirect.service";
import { Router } from "@angular/router";
import { UserService } from "../../core/services/user.service";
import { LijstrException } from "../../core/exceptions";

@Component({
  selector: 'lijstr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  model : AuthenticationRequest;
  submitting : boolean;
  userRestriction : boolean;
  error : string;

  private userSubscription;

  constructor(private loginService : LoginService,
              private userService : UserService,
              private router: Router,
              private redirect : RedirectService) {
  }

  ngOnInit() {
    this.model = new AuthenticationRequest();
    this.userRestriction = true;

    let loginStatus = this.loginService.getLoginStatus();
    if (loginStatus != null) {
      this.submitting = true;
      this.subscribe(loginStatus);
      return;
    }

    this.userSubscription = this.userService.userChangeFeed()
      .filter(x => x != null)
      .subscribe(
        user => {
          this.redirectRoute();
        }
      );

    this.submitting = false;
  }

  ngOnDestroy() : void {
    this.unsubscribeUserFeed();
  }

  onSubmit() {
    this.submitting = true;
    this.unsubscribeUserFeed();
    let loginStatus = this.loginService.login(this.model);
    this.subscribe(loginStatus);
  }

  private subscribe(userObservable : Observable<FullUser>) {
    userObservable.subscribe(
      user => {
        this.redirectRoute();
      },
      (error : LijstrException) => {
        this.submitting = false;
        console.log("Failed to login: " + error.message);
        this.error = LijstrException.toString(error);
      }
    );
  }

  private unsubscribeUserFeed() {
    console.log("Unsubscribe userFeed: " + (this.userService != null));
    if (this.userSubscription != null) {
      this.userSubscription.unsubscribe();
      this.userSubscription = null;
    }
  }

  private redirectRoute() {
    if (this.redirect.hasUrl()) {
      let url = this.redirect.popUrl();
      this.router.navigate([url]);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

}
