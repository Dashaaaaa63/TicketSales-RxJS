import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITour } from 'src/app/models/ITour';
import { INearestTour } from "../../models/INearestTour";
import { ITourLocation } from "../../models/ITourLocation";
import { IOrder } from "../../models/IOrder";


@Injectable({
  providedIn: 'root',
})
export class TicketRestService {
  constructor(private httpClient: HttpClient) {
  }

  getTickets(): Observable<ITour[]> {
    return this.httpClient.get<ITour[]>('http://localhost:3000/tours');
  }

  getTicket(id: string): Observable<ITour> {
    return this.httpClient.get<ITour>(`http://localhost:3000/tours/${id}`);
  }

  getRestError(): Observable<any> {
    return this.httpClient.get<any>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/tours/notFound');
  }

  getNearestTickets(): Observable<INearestTour[]> {
    return this.httpClient.get<INearestTour[]>('http://localhost:3000/tours');
  }

  getLocationList(): Observable<ITourLocation[]> {
    return this.httpClient.get<ITourLocation[]>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/location/');
  }

  getRandomNearestEvent(type: number): Observable<INearestTour> {
    switch (type) {
      case 0:
        return this.httpClient.get<INearestTour>('/assets/mocks/nearestTours1.json');
      case 1:
        return this.httpClient.get<INearestTour>('/assets/mocks/nearestTours2.json');
      case 2:
        return this.httpClient.get<INearestTour>('/assets/mocks/nearestTours3.json');
      default:
        return this.httpClient.get<INearestTour>('/assets/mocks/nearestTours2.json');
    }
  }

  sendTourData(data: IOrder): Observable<any> {
    return this.httpClient.post('http://localhost:3000/orders/', data);
  }

  createTour(body: any): Observable<any> {
    return this.httpClient.post('http://localhost:3000/tour-item', body, {
      headers: {}
    });
  }

  getToursByName(name: string): Observable<ITour[]> {
    return this.httpClient.get<ITour[]>(`http://localhost:3000/tour-item/${name}`);
  }
}
