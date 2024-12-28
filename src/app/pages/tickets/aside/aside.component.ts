import { TicketService } from './../../../services/tickets/ticket.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IMenuType } from 'src/app/models/IMenuType';
import { ITourTypeSelect } from 'src/app/models/ITourTypeSelect';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { HttpClient } from "@angular/common/http";
import { ITour } from "../../../models/ITour";

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
    private settingsService: SettingsService,
    private httpClient: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.menuTypes = [
      {type: 'custom', label: 'Обычное'},
      {type: 'extended', label: 'Расширенное'},
    ];

    this.tourTypes = [
      {label: 'Все', value: 'all'},
      {label: 'Одиночный', value: 'single'},
      {label: 'Групповые', value: 'multi'},
    ];
  }

  changeType(e: { e: Event; value: IMenuType }): void {
    this.updateMenuType.emit(e.value);
  }

  changeTourType(e: { e: Event; value: ITourTypeSelect }): void {
    this.ticketService.updateTour(e.value);
  }

  selectDate(e: string): void {
    this.ticketService.updateTour({date: e});
  }

  initRestError(): void {
    this.ticketService.getError().subscribe(
      (data) => {
      },
      (err) => {
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

  initTours(): void {
    this.httpClient.post<ITour[]>('http://localhost:3000/tours', {}).subscribe((data) => {
      this.ticketService.updateTicketList(data);
    });
  }

  deleteTours(): void {
    this.httpClient.delete('http://localhost:3000/tours').subscribe((data) => {
      this.ticketService.updateTicketList([]);
    });
  }
}
