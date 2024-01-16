import { NgModule } from '@angular/core';
import { UiComponent } from './ui.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    UiComponent,
    DropdownComponent
  ],
  imports: [
    RouterModule
  ],
  exports: [
    UiComponent
  ]
})
export class UiModule { }
