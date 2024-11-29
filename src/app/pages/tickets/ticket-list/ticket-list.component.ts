import {BlocksStyleDirective} from 'src/app/directives/blocks-style.directive';
import {ITour} from 'src/app/models/ITour';
import {TicketService} from '../../../services/tickets/ticket.service';
import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild,} from '@angular/core';
import {Router} from '@angular/router';
import {TicketsStorageService} from 'src/app/services/tickets-storage/tickets-storage.service';
import {debounceTime, fromEvent, Subscription} from 'rxjs';
import {ITourTypeSelect} from 'src/app/models/ITourTypeSelect';
import {UserService} from 'src/app/services/user/user.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss'],
})
export class TicketListComponent implements OnInit, OnDestroy, AfterViewInit {
  tickets: ITour[];
  ticketsCopy: ITour[];


  @ViewChild('tourWrap') tourWrap: ElementRef;
  @ViewChild('tourWrap', {read: BlocksStyleDirective}) blockDirective: BlocksStyleDirective;

  loadCountBlock: boolean = false;
  activeElementIndex: number = 0;
  private tourUnsubscribe: Subscription;

  @ViewChild('ticketSearch') ticketSearch: ElementRef;
  private searchTicketSub: Subscription;
  filterForTickets: string;


  constructor(
    private ticketService: TicketService,
    private router: Router,
    private ticketsStorage: TicketsStorageService,
    private userService: UserService
  ) {
  }

  ngAfterViewInit(): void {
    const fromEventObserver = fromEvent(this.ticketSearch.nativeElement, 'keyup');
    this.searchTicketSub = fromEventObserver
      .pipe(debounceTime(200))
      .subscribe((e: any) => {
        if (this.filterForTickets) {
          this.tickets = this.ticketsCopy.filter((el) => {
            return (
              el.name.toLowerCase().indexOf(this.filterForTickets.toLowerCase()) !==
              -1
            );
          });
        } else {
          this.tickets = [...this.ticketsCopy];
        }
      });
  }

  ngOnInit(): void {
    console.log('blockDirective', this.blockDirective);
    const authToken = this.userService.getToken();
    if (!authToken) {
      this.userService.setToken('user-private-token');
    }
    this.ticketService
      .getTickets()
      /*.pipe(
      catchError((error) => {
      let errorMessage = '';

      if (error.error instanceof ErrorEvent) {
      // client side error
      errorMessage = `Ошибка клиента: ${error.error.message}`;
      } else {
      // server side error
      errorMessage = `Ошибка сервера: ${error.status}, сообщение: ${error.message}`;
      this.tickets = TOURS as ITour[];
      this.ticketsCopy = [...this.tickets];
      this.ticketsStorage.setStorage(this.tickets);
      console.warn('Туры взяты из константы');

      }

      console.error(errorMessage);

      return throwError(() => new Error(errorMessage));
      }),


      )*/
      .subscribe((data) => {
        this.tickets = data;
        this.ticketsCopy = [...this.tickets];
        this.ticketsStorage.setStorage(this.tickets);


      });

    // 1 вариант
    this.tourUnsubscribe = this.ticketService.ticketType$.subscribe(
      (data: ITourTypeSelect) => {
        console.log('data', data);

        let ticketType: string;
        switch (data.value) {
          case 'single':
            this.tickets = this.ticketsCopy.filter((el) => el.type == 'single');
            break;
          case 'multi':
            this.tickets = this.ticketsCopy.filter((el) => el.type == 'multi');
            break;
          case 'all':
            this.tickets = [...this.ticketsCopy];
            break;
        }

        if (data.date) {
          const dateWithoutTime = new Date(data.date).toISOString().split('T');
          if (dateWithoutTime) {
            const dateValue = dateWithoutTime[0];
            if (dateValue) {
              console.log('dateValue', dateValue);
              this.tickets = this.ticketsCopy.filter(
                (el) => el.date === dateValue
              );
            }
          }
        }
        setTimeout(() => {
          this.blockDirective.updateItems();
        });
      }
    );

    // 2 вариант
    // this.tourUnsubscribe = this.ticketService
    //   .getTicketTypeObservable()
    //   .subscribe((data: ITourTypeSelect) => {
    //     console.log('data', data);
    //   });

  }

  ngOnDestroy(): void {
    this.tourUnsubscribe.unsubscribe();
    this.searchTicketSub.unsubscribe();
  }

  elementChanges(ev: any) {
    this.activeElementIndex = ev.index;
  }

  // filterOnChange(): void {
  //   if (this.filterForTickets) {
  //     const filteredTickets = this.ticketsStorage.getStorage().filter((el) => {
  //       return (
  //         el.name.toLowerCase().indexOf(this.filterForTickets.toLowerCase()) !==
  //         -1
  //       );
  //     });
  //     this.tickets = filteredTickets;
  //   } else {
  //     this.tickets = this.ticketsStorage.getStorage();
  //   }
  //   this.blockDirective.updateItems();
  // }

  goToTicketInfoPage(ticket: ITour): void {
    this.router.navigate([`/tickets/ticket/${ticket.id}`]);
  }

  directiveRenderComplete(e: boolean): void {
    console.log('call', e);
    const el = this.tourWrap.nativeElement as HTMLElement;
    el.classList.add('bg-color');
    this.loadCountBlock = true;

    // this.blockDirective.initStyle(3);
  }
}
