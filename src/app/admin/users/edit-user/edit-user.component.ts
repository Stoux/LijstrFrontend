import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FullUser, Permission } from '../../../core/models/user';
import { UserService } from '../../../core/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AdminUserService } from '../../services/admin-user.service';

@Component({
  selector: 'lijstr-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  @ViewChild('userForm') form: NgForm;

  user: FullUser;
  availablePermissions: { permission: Permission, selected: boolean }[];
  disabled: boolean;
  saving: boolean;
  messages: { type: string, text: string }[];

  constructor(private adminUserService: AdminUserService,
              private userService: UserService,
              private route: ActivatedRoute) {
    this.disabled = true;
    this.saving = false;
    this.messages = [];
  }

  ngOnInit() {
    this.route.data.subscribe((data: { user: FullUser }) => {
      const user = data.user;
      this.resetForm();
      this.onNewUser(user);
    });
  }

  private onNewUser(user: FullUser) {
    // Set the new user
    this.user = user;

    // (Re)Fetch the permissions
    this.availablePermissions = [];
    this.adminUserService.getPermissions().subscribe(
      permissions => {
        // User has changed before the permissions loaded
        if (user !== this.user) {
          return;
        }

        // Map the permissions to availablePermissions
        this.availablePermissions = permissions.map(permission => {
          // Check if the user has selected the given permission by finding it in the list of grantedPermissions
          const selected = (user.grantedPermissions.find(gp => gp.authority === permission.name)) !== undefined;
          return {permission, selected};
        });

        // (Re-)Enable the form
        this.disabled = false;
      }
    );
  }

  private resetForm() {
    // Reset the form if available
    if (this.form) {
      this.form.resetForm();
    }
  }

  async onSubmit(event: any): Promise<void> {
    if (this.saving) {
      this.addMessage({type: 'warning', text: 'Previous user is still being saved?'}, 5000);
      return;
    }

    this.disabled = true;
    this.saving = true;

    // Fetch the new details
    const user = this.user;
    const userId = this.user.id;
    const selectedPermissions: string[] = this.availablePermissions.filter(ap => ap.selected).map(ap => ap.permission.name);

    // Show a message that we're updating
    let updatingMessage: { type: string, text: string } | null = null;
    const setUpdatingMessage = (message?: string | null) => {
      if (updatingMessage !== null) {
        this.removeMessage(updatingMessage);
        updatingMessage = null;
      }
      if (message) {
        updatingMessage = {type: 'info', text: message};
        this.addMessage(updatingMessage);
      }
    };

    try {
      // Update the permissions
      setUpdatingMessage('Updating permissions...');
      const grantedPermissions = await this.adminUserService.updatePermissions(userId, selectedPermissions).toPromise();
      console.log(grantedPermissions);
      this.addMessage({type: 'success', text: 'Permissions have been updated.'}, 10000);

      // Update the user
      setUpdatingMessage('Updating user...');
      const updatedUser = await this.userService.updateUser(userId, user).toPromise();
      this.addMessage({type: 'success', text: 'User has been updated.'}, 10000);

      this.saving = false;
      if (this.user === user) {
        this.disabled = false;
        this.resetForm();
        setTimeout(() => this.onNewUser(updatedUser));
      }
    } catch (e) {
      console.error(e);
      this.addMessage({type: 'error', text: 'Something went wrong, check console.'}, 150000);
    } finally {
      setUpdatingMessage(null);
    }
  }

  private addMessage(message: { type: string, text: string }, timeout?: number) {
    this.messages.push(message);
    if (timeout) {
      setTimeout(() => this.removeMessage(message), timeout);
    }
    setTimeout(() => window.scrollTo(0, window.document.body.scrollHeight));
  }

  private removeMessage(message: { type: string, text: string }): void {
    const index = this.messages.indexOf(message);
    if (index >= 0) {
      // this.messages = [ ...this.messages.splice(index, 1) ];
      this.messages.splice(index, 1);
      // this.messages = spliced;
    }
  }

}
