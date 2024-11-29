import { Injectable } from '@angular/core';
import IUser from 'src/app/models/IUser';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private usersStorage: IUser[] = [];

  constructor() {
  }

  checkUser(user: IUser): boolean {
    let foundUser = this.usersStorage.find(
      (el) => el.login === user.login
    );
    if (foundUser) {
      return user.password === foundUser.password;
    } else {
      const localStorageUser = window.localStorage.getItem(`user`);
      if (localStorageUser) {
        foundUser = JSON.parse(localStorageUser) as IUser;
        return foundUser.password === user.password;
      } else {
        return false;
      }
    }
  }

  setUser(user: IUser, isUseLocalStorage: boolean): boolean {
    const foundUser = this.usersStorage.find(
      (el) => el.login === user.login
    );
    if (!foundUser && user?.login) {
      if (isUseLocalStorage) {
        window.localStorage.setItem(`user`, JSON.stringify(user));
        return true;
      } else {
        this.usersStorage.push(user);
        return true;
      }
    }
    return false;
  }

  isUserExists(user: IUser): boolean {
    const foundUser = this.usersStorage.find(
      (el) => el.login === user.login
    );
    if (foundUser) {
      return true;
    } else {
      return false;
    }
  }

}
