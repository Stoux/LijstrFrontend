import { Component } from "@angular/core";
import { AuthService } from "../../core/services/auth.service";
import { LoginService } from "../../core/services/login.service";

@Component({
  selector: 'lijstr-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(private loginService : LoginService) {
  }

  logout() {
    this.loginService.logout(false);
    window.location.replace("/");
  }

}
