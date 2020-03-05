import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationRequest } from '../../core/models/authentication';
import { LoginService } from '../../core/services/login.service';
import { Observable } from 'rxjs';
import { FullUser } from '../../core/models/user';
import { RedirectService } from '../../core/services/redirect.service';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { LijstrException } from '../../core/exceptions';
import { WithoutUserComponent } from '../core/WithoutUserComponent';

@Component({
  selector: 'lijstr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends WithoutUserComponent implements OnInit {

  model: AuthenticationRequest;
  submitting: boolean;
  userRestriction: boolean;
  error: string;

  constructor(private loginService: LoginService,
              userService: UserService,
              router: Router,
              redirect: RedirectService) {
    super(userService, router, redirect);
  }

  ngOnInit() {
    this.model = new AuthenticationRequest();
    this.userRestriction = true;

    const loginStatus = this.loginService.getLoginStatus();
    if (loginStatus != null) {
      this.submitting = true;
      this.subscribe(loginStatus);
      return;
    }

    super.ngOnInit();

    this.submitting = false;
  }

  onSubmit() {
    this.submitting = true;
    this.unsubscribeUserFeed();
    const loginStatus = this.loginService.login(this.model);
    this.subscribe(loginStatus);
  }

  private subscribe(userObservable: Observable<FullUser>) {
    userObservable.subscribe(
      user => {
        this.redirectRoute();
      },
      (error: LijstrException) => {
        this.submitting = false;
        console.log('Failed to login: ' + error.message);
        this.error = LijstrException.toString(error);
      }
    );
  }

}
