import { Component, OnInit } from '@angular/core';
import { AdminUserService } from '../services/admin-user.service';
import { FullUser } from '../../core/models/user';
import { LijstrException } from '../../core/exceptions';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'lijstr-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: FullUser[];
  error: LijstrException;

  constructor(private adminUserService: AdminUserService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.adminUserService.getUsers().subscribe(
      users => {
        this.users = users;
      },
      error => {
        this.error = error;
      }
    );
  }

  toUser(user: FullUser) {
    this.router.navigate([user.id], { relativeTo: this.route });
  }

}
