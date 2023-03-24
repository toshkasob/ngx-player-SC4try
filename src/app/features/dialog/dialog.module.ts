import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { DialogService } from "./dialog.service";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OverlayModule,
  ],
  providers: [DialogService],
})
export class DialogModule { }
