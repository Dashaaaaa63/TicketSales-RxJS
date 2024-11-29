import { TicketService } from './../../../services/tickets/ticket.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IMenuType } from 'src/app/models/IMenuType';
import { ITourTypeSelect } from 'src/app/models/ITourTypeSelect';
import { SettingsService } from 'src/app/services/settings/settings.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
})
export class AsideComponent implements OnInit {
  menuTypes: IMenuType[];
  tourTypes: ITourTypeSelect[];
  selectedMenuType: IMenuType;
  @Output() updateMenuType: EventEmitter<IMenuType> = new EventEmitter();

  constructor(
    private ticketService: TicketService,
    private messageService: MessageService,
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    this.menuTypes = [
      { type: 'custom', label: 'Обычное' },
      { type: 'extended', label: 'Расширенное' },
    ];

    this.tourTypes = [
      { label: 'Все', value: 'all' },
      { label: 'Одиночный', value: 'single' },
      { label: 'Групповые', value: 'multi' },
    ];
  }

  changeType(e: { e: Event; value: IMenuType }): void {
    console.log('ev', e);
    this.updateMenuType.emit(e.value);
  }

  changeTourType(e: { e: Event; value: ITourTypeSelect }): void {
    this.ticketService.updateTour(e.value);
  }

  selectDate(e: string): void {
    console.log('selectDate e:', e);
    this.ticketService.updateTour({ date: e });
  }

  initRestError(): void {
    this.ticketService.getError().subscribe(
      (data) => {},
      (err) => {
        console.log('err', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка запроса',
          detail: err.message,
        });
      }
    );
  }

  initSettingsData(): void {
    this.settingsService.loadUserSettingsSubject({
      saveToken: false,
    });
  }
}
