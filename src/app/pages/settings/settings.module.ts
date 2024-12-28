import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { ChangePasswordFormComponent } from './change-password-form/change-password-form.component';
import { CardModule } from "primeng/card";
import { InputTextModule } from "primeng/inputtext";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastModule } from "primeng/toast";
import { CheckboxModule } from "primeng/checkbox";
import { TabViewModule } from "primeng/tabview";
import { StatisticComponent } from './statistic/statistic.component';
import { TableModule } from "primeng/table";
import { UsersComponent } from './users/users.component';
import { FilterPipe } from './pipes/filter.pipe';
import { TourLoaderComponent } from './tour-loader/tour-loader.component';

@NgModule({
  declarations: [SettingsComponent, ChangePasswordFormComponent, StatisticComponent, UsersComponent, FilterPipe, TourLoaderComponent],
  imports: [CommonModule, SettingsRoutingModule, CardModule, InputTextModule, ReactiveFormsModule, ToastModule, CheckboxModule, FormsModule, TabViewModule, TableModule],
})
export class SettingsModule {
}
