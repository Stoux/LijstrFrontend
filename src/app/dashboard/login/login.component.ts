import { Component, OnInit } from "@angular/core";
import { AuthenticationRequest } from "../../core/services/models/authentication";
import { LoginService } from "../../core/services/login.service";
import { Observable } from "rxjs";
import { FullUser } from "../../core/services/models/user";
import { RedirectService } from "../../core/services/redirect.service";
import { Router } from "@angular/router";

@Component({
  selector: 'lijstr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model : AuthenticationRequest;
  submitting : boolean;
  error : string;

  constructor(private loginService : LoginService,
              private router: Router,
              private redirect : RedirectService) {
  }

  ngOnInit() {
    this.model = new AuthenticationRequest();

    let loginStatus = this.loginService.getLoginStatus();
    if (loginStatus != null) {
      this.submitting = true;
      this.subscribe(loginStatus);
      return;
    }

    this.submitting = false;
  }

  onSubmit() {
    this.submitting = true;
    let loginStatus = this.loginService.login(this.model);
    this.subscribe(loginStatus);
  }

  private subscribe(userObservable : Observable<FullUser>) {
    userObservable.subscribe(
      user => {
        if (this.redirect.hasUrl()) {
          let url = this.redirect.popUrl();
          this.router.navigate([url]);
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      error => {
        this.submitting = false;
        console.log("Failed to login: " + error.toString());
        if (typeof(error) == 'string') {
          this.error = error;
        } else {
          this.error = "[" + error.status + "] " + error.message;
        }
      }
    );
  }

}
