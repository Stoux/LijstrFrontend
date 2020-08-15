import { Component, OnInit } from '@angular/core';
import { NewPasswordRequest } from '../../core/models/authentication';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LijstrException } from '../../core/exceptions';
import { LoginService } from '../../core/services/login.service';
import { WithoutUserComponent } from '../core/WithoutUserComponent';
import { UserService } from '../../core/services/user.service';
import { RedirectService } from '../../core/services/redirect.service';

@Component({
  selector: 'lijstr-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent extends WithoutUserComponent implements OnInit {

  submitting: boolean;
  error: string;

  request: NewPasswordRequest;
  repeatPassword: string;

  constructor(private loginService: LoginService,
              userService: UserService,
              redirectService: RedirectService,
              router: Router,
              private activatedRoute: ActivatedRoute) {
    super(userService, router, redirectService);
  }

  ngOnInit() {
    this.submitting = false;
    this.request = new NewPasswordRequest();
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (!params.token) {
        this.router.navigate(['/']);
        return;
      }

      this.request.resetToken = params.token;
    });

    super.ngOnInit();
  }

  onSubmit() {
    this.submitting = true;
    this.unsubscribeUserFeed();
    this.loginService.newPassword(this.request).subscribe(
      () => {
        this.router.navigate(['/dashboard/login']);
      },
      (error: LijstrException) => {
        this.submitting = false;
        this.error = LijstrException.toString(error);
      }
    );
  }

}
