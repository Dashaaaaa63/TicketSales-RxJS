import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketsComponent } from './tickets.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { AsideComponent } from './aside/aside.component';
import { MenubarModule } from 'primeng/menubar';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { BlocksStyleDirective } from 'src/app/directives/blocks-style.directive';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  declarations: [
    TicketsComponent,
    HeaderComponent,
    FooterComponent,
    TicketListComponent,
    AsideComponent,
    BlocksStyleDirective,
  ],
    imports: [
        CommonModule,
        TicketsRoutingModule,
        MenubarModule,
        DropdownModule,
        FormsModule,
        InputTextModule,
        CalendarModule,
        ToastModule,
        SharedModule
    ],
  providers: [MessageService]
})
export class TicketsModule {}
