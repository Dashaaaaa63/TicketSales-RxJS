import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { IMenuType } from 'src/app/models/IMenuType';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy, OnChanges {
  items: MenuItem[];
  time: Date;

  // @Input() menuType: IMenuType;

  @Input() set menuType(type: IMenuType) {
    console.log('new type', type);
    this.settingsActive = this.menuType?.type === "extended";
    this.items = this.initMenuItems();
  }

  private settingsActive = false;

  private timerInterval: number;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.timerInterval = window.setInterval(() => {
      this.time = new Date();
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      window.clearInterval(this.timerInterval);
    }
    this.userService.logout();
  }

  ngOnChanges(): void {
    // this.settingsActive = this.menuType?.type === "extended";
    // this.items = this.initMenuItems();
  }

  initMenuItems(): MenuItem[] {
    return [
      {
        label: 'Билеты',
        icon: 'pi pi-ticket',
        routerLink: ['tickets-list'],
      },
      {
        label: 'Настройки',
        icon: 'pi pi-cog',
        routerLink: ['settings'],
      },
      {
        label: 'Заказы',
        icon: 'pi pi-list',
        routerLink: ['orders'],
      },
      {
        label: 'Выйти',
        icon: 'pi pi-sign-out',
        routerLink: ['/auth'],
      },
    ];
  }

  get userName(): string {
    return this.userService.getUser()?.login || '';
  }
}
