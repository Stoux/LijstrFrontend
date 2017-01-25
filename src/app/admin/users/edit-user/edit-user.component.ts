import { Component, OnInit, Input } from "@angular/core";
import { FullUser } from "../../../core/models/user";

@Component({
  selector: 'lijstr-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  @Input() user : FullUser;

  constructor() {
  }

  ngOnInit() {
  }

}
