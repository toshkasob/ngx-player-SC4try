import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoCustomizationComponent } from './video-customization.component';
import { AppInputRangeModule } from '../player/components/app-input-range/app-input-range.module';
import { VideoCustomizationDirective } from './directives/video-customization.directive';
import { UnwantedContentDirective } from './directives/unwanted-content.directive';
import { UnwantedContentComponent } from './components/unwanted-content/unwanted-content.component';
import { SkipControlDirective } from './directives/skip-control.directive';
import { SkipControlComponent } from './components/skip-control/skip-control/skip-control.component';
import { SpinnerModule } from "../../shared/spinner/spinner.module";

@NgModule({
  declarations: [
    VideoCustomizationComponent,
    VideoCustomizationDirective,
    UnwantedContentDirective,
    UnwantedContentComponent,
    SkipControlDirective,
    SkipControlComponent,
  ],
  exports: [VideoCustomizationComponent, VideoCustomizationDirective, UnwantedContentDirective, SkipControlDirective],
  imports: [CommonModule, AppInputRangeModule, SpinnerModule],
})
export class VideoCustomizationModule {}
