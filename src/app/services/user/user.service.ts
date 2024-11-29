import { Injectable } from '@angular/core';
import IUser from 'src/app/models/IUser';
import { BehaviorSubject } from "rxjs";
import { UserRules } from "../../shared/mocks/rules";
import { UserAccessService } from "../user-access/user-access.service";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: IUser;
  private token: string;

  private userBehSubject = new BehaviorSubject<IUser | null>(null);
  readonly userBehSubject$ = this.userBehSubject.asObservable();

  constructor(private userAccessService: UserAccessService) {
  }

  getUser(): IUser {
    const userFromStore = window.localStorage.getItem('user');
    return this.user || (userFromStore ? JSON.parse(userFromStore) : null);
  }

  setUser(user: IUser): void {
    this.user = user;
    this.userAccessService.initAccess(UserRules)
    this.userBehSubject.next(this.user);
  }

  setToken(token: string): void {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  logout(): void {
    this.user = {} as IUser;
    this.token = '';
    console.log('Данные пользователя зачищены');
  }

  changePassword(password: string): void {
    const user: IUser = this.getUser();
    user.password = password;
    this.user = user;
    window.localStorage.setItem('user', JSON.stringify(user));
  }

  get isAuthenticated(): boolean {
    return !!this.getUser();
  }

}
