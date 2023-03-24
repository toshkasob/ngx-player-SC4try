import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoCustomizationComponent } from './video-customization.component';
import { AppInputRangeModule } from '../player/components/app-input-range/app-input-range.module';
import { VideoCustomizationDirective } from './directives/video-customization.directive';

@NgModule({
  declarations: [VideoCustomizationComponent, VideoCustomizationDirective],
  exports: [VideoCustomizationComponent, VideoCustomizationDirective],
  imports: [CommonModule, AppInputRangeModule],
})
export class VideoCustomizationModule {}
