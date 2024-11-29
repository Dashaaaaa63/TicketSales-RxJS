import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { UserService } from "../../../services/user/user.service";
import { MessageService } from "primeng/api";
import { createPasswordStrengthValidator } from "../validators/password";

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.scss']
})
export class ChangePasswordFormComponent implements OnInit {
  changePasswordForm: FormGroup;
  throwException: boolean = false;

  constructor(
    private userService: UserService,
    private messageService: MessageService,
  ) {
  }

  ngOnInit(): void {
    this.changePasswordForm = new FormGroup({
      currentPassword: new FormControl('', [Validators.required, this.currentPasswordValidator()]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6), this.newPasswordValidator(), createPasswordStrengthValidator()]),
      repeatNewPassword: new FormControl('', [Validators.required, Validators.minLength(6), this.repeatNewPasswordValidator(), createPasswordStrengthValidator()]),
    });
  }

  onSubmit() {

    if (this.throwException) {
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка при смене пароля',
        detail: 'Пример ошибки при смене пароля',
      });
      return;
    }
    this.userService.changePassword(this.changePasswordForm.get('newPassword').value);
    this.messageService.add({
      severity: 'success',
      summary: 'Пароль изменен ',
      detail: 'Пароль успешно изменен',
    });
  }


  currentPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const equal = this.userService.getUser().password === control.value;
      if (!equal) {
        // this.messageService.add({
        //   severity: 'error',
        //   summary: 'Неверный пароль',
        //   detail: 'Введенный пароль должен совпадать с текущим'
        // });
        return {currentPasswordMismatch: true};
      }
      console.log('currentPassword valid');
      return null;
    };
  }

  newPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const currentPassword: string = this.changePasswordForm?.controls['currentPassword'].value;
      const equal = currentPassword === control.value;
      if (equal) {
        // this.messageService.add({
        //   severity: 'error',
        //   summary: 'Пароли совпдают',
        //   detail: 'Текущий и новый пароль не должны совпадать'
        // });
        return {newAndCurrentPasswordMismatch: true};
      }
      console.log('newPassword valid');

      return null;
    };
  }

  repeatNewPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      const newPassword: string = this.changePasswordForm?.controls['newPassword'].value;
      const repeatNewPassword: string = this.changePasswordForm?.controls['repeatNewPassword'].value;
      const equal = newPassword === repeatNewPassword;
      if (!equal) {
        // this.messageService.add({
        //   severity: 'error',
        //   summary: 'Пароли не совпадают совпдают',
        //   detail: 'Новый пароль и подтверждениен нового пароля не совпадают'
        // });
        return {newPasswordRepeatMismatch: true};
      }
      console.log('repeatNewPassword valid');

      return null;
    };
  }

  protected readonly JSON = JSON;
}
