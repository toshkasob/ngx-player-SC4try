import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PlayerModule } from './features/player/player.module';
import { OverlayModule } from "@angular/cdk/overlay";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, PlayerModule, OverlayModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
