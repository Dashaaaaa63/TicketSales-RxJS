import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, switchMap, withLatestFrom } from "rxjs";
import { TreeNode } from "primeng/api";
import { OrderPropsType, ORDERSMOCK, OrderType } from "../../shared/mocks/orders";
import { HttpClient } from "@angular/common/http";
import { UserService } from "../user/user.service";
import { IOrder } from "../../models/IOrder";


@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private groupOrders = new BehaviorSubject(false);
  readonly groupOrders$ = this.groupOrders.asObservable();

  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) {
  }

  getOrders(): Observable<TreeNode<OrderType[]>[]> {
    return of(ORDERSMOCK).pipe(
      withLatestFrom(this.groupOrders$),
      switchMap(([orders, group]) => {
        return of(orders).pipe(
          map((data) => {
            if (group) {
              return [this.groupData(data, 'name')];
            } else {
              return [this.transformOrderData(data)];
            }
          })
        );
      })
    );
  }

  getMyOrders(): Observable<IOrder[]> {
    return this.httpClient.get<IOrder[]>(`http://localhost:3000/orders/${this.userService.getUser().id}`);
  }

  initGroupOrders(val: boolean): void {
    this.groupOrders.next(val);
  }

  transformOrderData(data: OrderType[]): TreeNode<OrderType[]> {
    const treeNodeObj: TreeNode = {
      children: [],
      data: {
        name: 'Заказы'
      },
      expanded: true
    };

    if (Array.isArray(data)) {
      data.forEach((item) => {
        const dataObj = {
          data: item,
        };
        treeNodeObj.children?.push(dataObj);
      });
    } else {
      return <TreeNode<OrderType[]>>[];
    }
    return treeNodeObj;
  }

  groupData(data: OrderType[], prop: OrderPropsType): TreeNode<OrderType[]> {
    const treeNodeObj: TreeNode = {
      children: [],
      data: {
        name: 'Заказы'
      },
      expanded: true
    };

    if (Array.isArray(data)) {

      data.reduce((acc, el, index) => {
        const targetItem = acc.children.find((treeEl) => treeEl.data[prop] === el[prop]);
        if (targetItem) {
          const newTreeNode: TreeNode = {
            data: el,
            expanded: false,
            //children:[] -- если будет третий уровень - нужна рекурсия
          };
          // добавляем
          targetItem.children.push(newTreeNode);
        } else {
          const newTreeNode: TreeNode = {
            data: el,
            expanded: false,
            children: []
          };
          // добавляем
          acc.children.push(newTreeNode);
        }
        return treeNodeObj;
      }, treeNodeObj);
      return treeNodeObj;
    } else {
      return <TreeNode<OrderType[]>>[];
    }
  }
}
