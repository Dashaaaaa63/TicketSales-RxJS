import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SettingsComponent} from './settings/settings.component';
import {AccordionModule} from "primeng/accordion";

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, AccordionModule]
})
export class SettingsRoutingModule {
}
