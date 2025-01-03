import { Injectable } from '@angular/core';
import { StatisticRestService } from "../rest/statistic-rest/statistic-rest.service";
import { map, Observable } from "rxjs";
import { ICustomStatisticUser } from "../../models/ICustomStatisticUser";

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(private statisticRest: StatisticRestService) {
  }

  getUserStatistic(): Observable<ICustomStatisticUser[]> {
    return this.statisticRest.getUserStatistic().pipe(
      map((data) => {
        const newDataArr: ICustomStatisticUser[] = [];

        data.forEach((el) => {
          const newDataObj: ICustomStatisticUser = {
            id: el.id,
            name: el.name,
            city: el.address.city,
            company: el.company.name,
            phone: el.phone,
            street: el.address.street
          };
          newDataArr.push(newDataObj);
        });
        
        return newDataArr;
      })
    );
  };
}
