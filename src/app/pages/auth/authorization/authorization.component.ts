import { UserService } from './../../../services/user/user.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import IUser from 'src/app/models/IUser';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { HttpClient } from "@angular/common/http";
import { IServerError } from "../../../models/IServerError";

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss'],
})
export class AuthorizationComponent implements OnInit, OnDestroy {
  loginNameLable: string = 'Логин';
  passwordLable: string = 'Пароль';
  login: string = '';
  password: string = '';
  selectedValue: boolean = false;
  cardNumber: string;
  authTextButton: string;
  showCardNumber: boolean;


  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private httpClient: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.authTextButton = 'Авторизоваться';
    this.showCardNumber = ConfigService.config.useUserCard;
  }

  ngOnDestroy(): void {
  }

  vipStatusSelected(): void {
  }

  onAuth(e: Event): void {
    const user: IUser = {
      login: this.login,
      password: this.password,
      cardNumber: this.cardNumber
    };
    this.httpClient.post<{
      id: string,
      access_token: string
    }>(`http://localhost:3000/users/${user.login}`, user).subscribe({
        next: (data) => {
          user.id = data.id;
          this.userService.setUser(user);
          const token: string = data.access_token;
          this.userService.setToken(token);
          this.userService.setTokenToStore(token);
          this.router.navigate(['tickets/tickets-list']);
        },
        error: (error) => {
          const serverError = <IServerError>error.error;
          this.messageService.add({severity: 'warn', summary: serverError.errorText});
        }
      }
    );

    // if (this.authService.checkUser(user)) {
    //   this.userService.setUser(user);
    //   this.userService.setToken('user-private-token');
    //   this.router.navigate(['tickets/tickets-list']);
    // } else {
    //   this.messageService.add({
    //     severity: 'error',
    //     summary: 'Ошибка авторизации',
    //     detail:
    //       'Пользователь с такими данными не существует или введен неверный пароль',
    //   });
  }
}
