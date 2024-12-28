import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ITour } from 'src/app/models/ITour';
import IUser from 'src/app/models/IUser';
import { TicketsStorageService } from 'src/app/services/tickets-storage/tickets-storage.service';
import { UserService } from 'src/app/services/user/user.service';
import { TicketService } from "../../../services/tickets/ticket.service";
import { fromEvent, Subscription } from "rxjs";
import { INearestTour } from "../../../models/INearestTour";
import { ITourLocation } from "../../../models/ITourLocation";
import { INearestTourWithLocation } from "../../../models/INearestTourWithLocation";

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss'],
})
export class TicketItemComponent implements OnInit, OnDestroy, AfterViewInit {

  ticket: ITour | undefined;
  user: IUser;
  userForm: FormGroup;
  nearestTours: INearestTour[];
  toursLocation: ITourLocation[];
  nearestTourWithLocation: INearestTourWithLocation[];
  tours: ITour[];


  @ViewChild('ticketSearch') ticketSearch: ElementRef;
  ticketSearchValue: string;
  ticketSearchSub: Subscription;
  ticketRestSub: Subscription;


  constructor(
    private route: ActivatedRoute,
    private ticketsStorage: TicketsStorageService,
    private userService: UserService,
    private ticketService: TicketService,
  ) {
  }


  ngOnInit(): void {
    this.user = this.userService.getUser();

    // init formGroup
    this.userForm = new FormGroup({
      firstName: new FormControl('aa', {validators: Validators.required}),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      cardNumber: new FormControl(''),
      birthDate: new FormControl(''),
      age: new FormControl(),
      citizenship: new FormControl(''),
    });

    // get nearest TOURS
    // forkJoin(
    //   [
    //     this.ticketService.getNearestTour(),
    //     this.ticketService.getToursLocation()
    //   ]
    // ).subscribe((data) => {
    //   this.nearestTours = data[0];
    //   this.toursLocation = data[1];
    //   this.nearestTourWithLocation = this.ticketService.getNearestToursWithLocation(this.nearestTours, this.toursLocation);
    // });
    this.ticketRestSub = this.ticketService.getTickets().subscribe((data) => {
      this.tours = data;
    });

    // params
    const routeIdParam = this.route.snapshot.paramMap.get('id'); //for route
    const queryIdParam = this.route.snapshot.queryParamMap.get('id'); // for queryParams

    const paramValueId = routeIdParam || queryIdParam;
    if (paramValueId) {
      this.ticketService.getTicket(paramValueId).subscribe({
        next: (data) => this.ticket = data,
        error: (error) => console.error('getTicket', error)
      });
    }
  }

  ngAfterViewInit(): void {
    this.userForm.controls['cardNumber'].setValue(this.user?.cardNumber);
    const fromEventObserver = fromEvent(this.ticketSearch.nativeElement, 'keyup');
    this.ticketSearchSub = fromEventObserver.subscribe((e: any) => {
      if (this.ticketSearchValue !== '') {
        this.initSearchTour();
      } else {
        this.nearestTourWithLocation = this.ticketService.getNearestToursWithLocation(this.nearestTours, this.toursLocation);
      }

    });
  }

  ngOnDestroy(): void {
    this.ticketSearchSub.unsubscribe();
    // Не самая лучшая реализация отписки, можно придумать и получше. Наверное...
    if (this.ticketRestSub && !this.ticketSearchSub.closed) {
      this.ticketRestSub.unsubscribe();
    }
  }

  initSearchTour(): void {

    // unsubscribe
    if (this.ticketRestSub && !this.ticketSearchSub.closed) {
      this.ticketRestSub.unsubscribe();
    }

    this.ticketRestSub = this.ticketService.searchToursByName(this.ticketSearchValue).subscribe((data) => {
      this.tours = data;
    });
  }

  initTour(): void {
    const userData = this.userForm.getRawValue();
    const postData = {...this.ticket, ...userData};

    const userId = this.userService.getUser()?.id || null;
    const postObj = {
      age: postData.age,
      birthDay: postData.birthDay,
      cardNumber: postData.cardNumber,
      tourId: postData._id,
      userId: userId,
      orderPerson: userData
    };

    this.ticketService.sendTourData(postObj).subscribe();
  }


  selectDate(e: Event): void {
  }

}
