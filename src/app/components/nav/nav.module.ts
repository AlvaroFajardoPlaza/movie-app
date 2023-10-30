import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorizontalBarComponent } from './horizontal-bar/horizontal-bar.component';


@NgModule({
  declarations: [
    HorizontalBarComponent
  ],
  imports: [
    CommonModule
  ], 
  exports: [
    HorizontalBarComponent
  ]
})
export class NavModule { }
