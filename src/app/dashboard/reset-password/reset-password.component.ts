import { Component, OnInit } from '@angular/core';
import { NewPasswordRequest } from "../../core/models/authentication";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { LijstrException } from "../../core/exceptions";
import { LoginService } from "../../core/services/login.service";

@Component({
  selector: 'lijstr-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  submitting : boolean;
  error : string;

  request : NewPasswordRequest;
  repeatPassword : string;

  constructor(private loginService : LoginService,
              private activatedRoute : ActivatedRoute,
              private router : Router) { }

  ngOnInit() {
    this.submitting = false;
    this.request = new NewPasswordRequest();
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (!params['token']) {
        this.router.navigate(['/']);
        return;
      }

      this.request.resetToken = params['token'];
    });
  }

  onSubmit() {
    this.submitting = true;
    this.loginService.newPassword(this.request).subscribe(
      success => {
        this.router.navigate(['/dashboard/login']);
      },
      (error : LijstrException) => {
        this.submitting = false;
        this.error = LijstrException.toString(error);
      }
    );
  }

}
