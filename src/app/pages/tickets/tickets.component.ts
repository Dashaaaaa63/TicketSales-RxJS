import {Component, OnDestroy, OnInit} from '@angular/core';
import {IMenuType} from 'src/app/models/IMenuType';
import {filter, Subject, takeUntil, tap} from "rxjs";
import {ActivatedRoute, ActivatedRouteSnapshot, ActivationStart, Router} from "@angular/router";

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit, OnDestroy {
  selectedType: IMenuType
  showAside = true;
  destroyer = new Subject();
  dataProp = 'asideHidden';

  constructor(private router: Router, private route: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.showAside = !this.recursFindPropertyInData(this.route.snapshot, this.dataProp);

    this.router.events
      .pipe(
        //tap((data) => console.log('data', data)),
        filter((ev) => ev instanceof ActivationStart), // Фильтрация даты, т.е. получаем только нужные данные
        takeUntil(this.destroyer)
      )
      .subscribe((data) => {
          if (data instanceof ActivationStart) {
            this.showAside = !this.recursFindPropertyInData(data.snapshot, this.dataProp);
          }
        }
      );
  }

  ngOnDestroy(): void {
    this.destroyer.next(true);
    this.destroyer.complete();
  }

  updateSelectedType(e: IMenuType): void {
    this.selectedType = e;
  }

  recursFindPropertyInData(currentSnapshot: ActivatedRouteSnapshot, searchProp: string): boolean {
    console.log('currentSnapshot', currentSnapshot);

    if (currentSnapshot?.data[searchProp]) {
      return true;
    } else {
      if (Array.isArray(currentSnapshot.children)) {
        let result = false;
        currentSnapshot.children.every((el) => {
          result = this.recursFindPropertyInData(el, searchProp);
          return !result
        });
        return result;
      } else {
        return false;
      }
    }
  }

}
