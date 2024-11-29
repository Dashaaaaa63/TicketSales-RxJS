import { Injectable } from '@angular/core';
import { UserService } from "../../../services/user/user.service";
import { delay, map, Observable, of, switchMap, withLatestFrom } from "rxjs";
import { ISettingsUsers } from "../../../models/ISettingsUsers";
import { USERS } from "../../../shared/mocks/users";

@Injectable({
  providedIn: 'root'
})
export class UsersSettingsService {

  constructor(private userService: UserService) {
  }

  getUsers(): Observable<ISettingsUsers[]> {
    const usersArr: ISettingsUsers[] = Array.isArray(USERS) ? [...USERS] : [];

    // get users
    return of(usersArr).pipe(
      withLatestFrom(this.userService.userBehSubject$),

      switchMap(([users, ownUser]) => {
        const newUser = {fio: ownUser?.login || ''};
        return of(users.concat([newUser]));
      }),

      // checks
      map((arr) => arr.filter((el: ISettingsUsers) => el.fio)),
      map((arr) => arr.concat(arr)),

      // add delay
      delay(300)
    );

  }
}
