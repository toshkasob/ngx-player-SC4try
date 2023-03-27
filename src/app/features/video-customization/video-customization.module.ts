import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoCustomizationComponent } from './video-customization.component';
import { AppInputRangeModule } from '../player/components/app-input-range/app-input-range.module';
import { VideoCustomizationDirective } from './directives/video-customization.directive';
import { MatchingTypeEpilepsyPipe } from './pipes/matching-type-epilepsy.pipe';
import { UnwantedContentDirective } from './directives/unwanted-content.directive';
import { UnwantedContentComponent } from './components/unwanted-content/unwanted-content.component';

@NgModule({
  declarations: [
    VideoCustomizationComponent,
    VideoCustomizationDirective,
    MatchingTypeEpilepsyPipe,
    UnwantedContentDirective,
    UnwantedContentComponent,
  ],
  exports: [VideoCustomizationComponent, VideoCustomizationDirective, UnwantedContentDirective],
  imports: [CommonModule, AppInputRangeModule],
})
export class VideoCustomizationModule {}
