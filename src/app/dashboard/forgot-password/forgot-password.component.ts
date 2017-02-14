import { Component } from "@angular/core";
import { ResetPasswordRequest } from "../../core/models/authentication";
import { UserService } from "../../core/services/user.service";
import { LoginService } from "../../core/services/login.service";
import { Router } from "@angular/router";
import { RedirectService } from "../../core/services/redirect.service";
import { WithoutUserComponent } from "../core/WithoutUserComponent";
import { LijstrException } from "../../core/exceptions";

@Component({
  selector: 'lijstr-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent extends WithoutUserComponent {

  model : ResetPasswordRequest;

  submitting : boolean;
  finished : boolean;
  error : LijstrException;

  constructor(private loginService : LoginService,
              userService : UserService,
              router : Router,
              redirect : RedirectService) {
    super(userService, router, redirect);
  }

  ngOnInit() {
    this.submitting = false;
    this.finished = false;
    this.error = null;
    this.model = new ResetPasswordRequest();

    super.ngOnInit();
  }

  onSubmit() {
    this.submitting = true;
    this.loginService.requestNewPassword(this.model)
      .finally(() => this.submitting = false)
      .subscribe(
        () => this.finished = true,
        (error) => this.error = error
      )
  }

}
