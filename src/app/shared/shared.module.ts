import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectiveModule } from "../directives/directive.module";
import { CanWriteDirective } from "../directives/can-write.directive";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DirectiveModule
  ],
  exports: [CanWriteDirective]
})
export class SharedModule { }
