import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import IUser from 'src/app/models/IUser';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config/config.service';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { IServerError } from "../../../models/IServerError";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  login: string;
  password: string;
  passwordRepeat: string;
  email: string;
  cardNumber: string;
  isUseLocalStorage: boolean;
  showCardNumber: boolean;

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router,
    private httpClient: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.showCardNumber = ConfigService.config.useUserCard;
  }

  registration(e: Event): void | boolean {
    if (this.password !== this.passwordRepeat) {
      this.messageService.add({
        severity: 'error',
        summary: 'Пароли не совпадают',
      });
      return false;
    }

    const user: IUser = {
      password: this.password,
      cardNumber: this.cardNumber,
      login: this.login,
      email: this.email,
    };


    this.httpClient.post<boolean>('http://localhost:3000/users/', user).subscribe({
      next: (data) => {
        if (this.isUseLocalStorage) {
          const userJsonStr = JSON.stringify(user);
          window.localStorage.setItem(`user_${user.login}`, userJsonStr);
        }
        if (data) {
          this.messageService.add({severity: 'success', summary: 'Регистрация прошла успешно'});
        } else {
          this.messageService.add({severity: 'error', summary: 'Регистрация прошла не успешно'});
        }
      },
      error: (error: HttpErrorResponse) => {
        const serverError = <IServerError>error.error;
        this.messageService.add({severity: 'warn', summary: serverError.errorText});
      }
    });
  }

  //   if (!this.authService.isUserExists(user)) {
  //     const registrResult = this.authService.setUser(
  //       user,
  //       this.isUseLocalStorage
  //     );
  //
  //     if (registrResult && this.isUseLocalStorage) {
  //       this.messageService.add({
  //         severity: 'success',
  //         summary: 'Вы зарегистрированы',
  //         detail:
  //           'Пользователь успешно добавлен в локальное хранилище браузера',
  //       });
  //     } else if (registrResult && !this.isUseLocalStorage) {
  //       this.messageService.add({
  //         severity: 'success',
  //         summary: 'Вы зарегистрированы',
  //         detail: 'Пользователь успешно добавлен в хранилище пользователей',
  //       });
  //     }
  //   } else {
  //     this.messageService.add({
  //       severity: 'warn',
  //       summary: 'Пользователь уже существует',
  //       detail: 'Пользователь с таким логином уже зарегистрирован',
  //     });
  //   }
  // }
}
