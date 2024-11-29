import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IStatisticUser } from "../../../models/IStatisticUser";

@Injectable({
  providedIn: 'root'
})
export class StatisticRestService {

  constructor(private httpClient: HttpClient) {
  }

  getUserStatistic(): Observable<IStatisticUser[]> {
    return this.httpClient.get<IStatisticUser[]>('https://jsonplaceholder.typicode.com/users');
  }
}
