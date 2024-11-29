import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OrdersRoutingModule} from './orders-routing.module';
import {OrdersComponent} from './orders/orders.component';
import {OrderHeaderComponent} from './order-header/order-header.component';
import {CheckboxModule} from "primeng/checkbox";
import {TreeTableModule} from "primeng/treetable";


@NgModule({
  declarations: [
    OrdersComponent,
    OrderHeaderComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    CheckboxModule,
    TreeTableModule,
  ]
})
export class OrdersModule {
}
