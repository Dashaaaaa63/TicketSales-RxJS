import { Injectable } from '@angular/core';
import { TicketRestService } from '../rest/ticket-rest.service';
import { Observable, Subject } from 'rxjs';
import { ITour } from 'src/app/models/ITour';
import { ITourTypeSelect } from 'src/app/models/ITourTypeSelect';
import { INearestTour } from "../../models/INearestTour";
import { ITourLocation } from "../../models/ITourLocation";
import { INearestTourWithLocation } from "../../models/INearestTourWithLocation";

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private ticketSubject = new Subject<ITourTypeSelect>();
  readonly ticketType$ = this.ticketSubject.asObservable(); // 1 вариант получения Observable

  private ticketUpdateSubject = new Subject<ITour[]>();
  readonly ticketUpdateSubject$ = this.ticketUpdateSubject.asObservable();


  constructor(private ticketRestService: TicketRestService) {
  }

  getTickets(): Observable<ITour[]> {
    return this.ticketRestService.getTickets();
    /*.pipe(
    map((value) => {
      const singleTours = value.filter((el) => el.type === 'single');
      return value.concat(singleTours);
    })
  );*/
  }

  getTicket(id: string): Observable<ITour> {
    return this.ticketRestService.getTicket(id);
  }

  // 2 вариант получения Observable
  getTicketTypeObservable(): Observable<ITourTypeSelect> {
    return this.ticketSubject.asObservable();
  }

  updateTour(type: ITourTypeSelect): void {
    this.ticketSubject.next(type);
  }

  updateTicketList(data: ITour[]): void {
    this.ticketUpdateSubject.next(data);
  }

  getError(): Observable<any> {
    return this.ticketRestService.getRestError();
  }

  getNearestTour(): Observable<INearestTour[]> {
    return this.ticketRestService.getNearestTickets();
  }

  getToursLocation(): Observable<ITourLocation[]> {
    return this.ticketRestService.getLocationList();
  }

  searchToursByName(name: string): Observable<ITour[]> {
    return this.ticketRestService.getToursByName(name);
  }

  getNearestToursWithLocation(nearestTour: INearestTour[], locations: ITourLocation[]): INearestTourWithLocation[] {
    const nearestToursWithLocation: INearestTourWithLocation[] = [];
    nearestTour.forEach((nearestTour) => {
      const newNearestTourWithLocation = <INearestTourWithLocation>{...nearestTour};
      newNearestTourWithLocation.location = <INearestTourWithLocation>locations.find((location) => {
        return location.id = newNearestTourWithLocation.locationId;
      });
      nearestToursWithLocation.push(newNearestTourWithLocation);
    });
    return nearestToursWithLocation;
  }

  getRandomNearestEvent(type: number): Observable<INearestTour> {
    return this.ticketRestService.getRandomNearestEvent(type);
  }

  sendTourData(data: any): Observable<any> {
    return this.ticketRestService.sendTourData(data);
  }

  createTour(data: any): Observable<any> {
    return this.ticketRestService.createTour(data);
  }
}
