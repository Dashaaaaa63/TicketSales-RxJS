import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { TOURS } from 'src/app/shared/mocks/tours';
import { ITour } from 'src/app/models/ITour';
import { INearestTour } from "../../models/INearestTour";
import { ITourLocation } from "../../models/ITourLocation";
import { NEARESTTOURS } from "../../shared/mocks/nearestTours";
import { LOCATION } from "../../shared/mocks/location";


@Injectable({
  providedIn: 'root',
})
export class TicketRestService {
  constructor(private httpClient: HttpClient) {
  }

  getTickets(): Observable<ITour[]> {
    return this.httpClient
      .get<ITour[]>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/tours/')
      .pipe(
        catchError((error) => {
          let errorMessage = '';

          if (error.error instanceof ErrorEvent) {
            // client side error
            errorMessage = `Ошибка клиента: ${error.error.message}`;
          } else {
            // server side error
            errorMessage = `Ошибка сервера: ${error.status}, сообщение: ${error.message}`;
            console.warn('Туры взяты из константы');
          }
          console.warn(errorMessage);

          return of(TOURS as ITour[]);
        })
      );
  }

  getRestError(): Observable<any> {
    return this.httpClient.get<any>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/tours/notFound');
  }

  getNearestTickets(): Observable<INearestTour[]> {
    return this.httpClient.get<INearestTour[]>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/nearestTours/').pipe(
      catchError((error) => {
        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {
          // client side error
          errorMessage = `Ошибка клиента: ${error.error.message}`;
        } else {
          // server side error
          errorMessage = `Ошибка сервера: ${error.status}, сообщение: ${error.message}`;
          console.warn('Похожие туры взяты из константы');
        }
        console.warn(errorMessage);

        return of(NEARESTTOURS as INearestTour[]);
      })
    );
  }

  getLocationList(): Observable<ITourLocation[]> {
    return this.httpClient.get<ITourLocation[]>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/location/').pipe(
      catchError((error) => {
        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {
          // client side error
          errorMessage = `Ошибка клиента: ${error.error.message}`;
        } else {
          // server side error
          errorMessage = `Ошибка сервера: ${error.status}, сообщение: ${error.message}`;
          console.warn('Локации взяты из константы');
        }
        console.warn(errorMessage);

        return of(LOCATION as ITourLocation[]);
      })
    );
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

  sendTourData(data: any): Observable<any> {
    return this.httpClient.post('/sendTourData', data);
  }
}
