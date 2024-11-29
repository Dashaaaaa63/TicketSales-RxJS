import { Component, OnInit } from '@angular/core';
import { UsersSettingsService } from "../services/users-settings.service";
import { ISettingsUsers } from "../../../models/ISettingsUsers";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: ISettingsUsers[];
  searchValue: string;
  asyncUsers = this.usersSettingsService.getUsers();

  constructor(private usersSettingsService: UsersSettingsService) {
  }

  ngOnInit(): void {

  }

}
