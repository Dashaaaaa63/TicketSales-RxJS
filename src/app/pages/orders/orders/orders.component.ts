import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrdersService} from "../../../services/orders/orders.service";
import {TreeNode} from "primeng/api";
import {OrderType} from "../../../shared/mocks/orders";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {
  private _destroyer: Subscription;
  tableData$: Observable<TreeNode<OrderType[]>[]>;


  constructor(private ordersService: OrdersService) {
  }

  ngOnDestroy(): void {
    this._destroyer.unsubscribe();
  }

  ngOnInit(): void {
    this.initOrders();

    this._destroyer = this.ordersService.groupOrders$.subscribe((data) => {
      this.initOrders();
    });
  }

  initOrders(): void {
    this.tableData$ = this.ordersService.getOrders();
  }

}
