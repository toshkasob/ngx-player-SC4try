import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSelectComponent } from '../app-select/app-select.component';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { FullscreenComponent } from '../fullscreen/fullscreen.component';
import { PlayerControlsComponent } from './player-controls.component';
import { DialogModule } from '../../../dialog/dialog.module';
import { PlayerSettingsComponent } from '../player-settings/player-settings.component';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { VideoTimePipe } from '../../pipes/video-time.pipe';
import { AppInputRangeModule } from '../app-input-range/app-input-range.module';
import { VideoCustomizationModule } from "../../../video-customization/video-customization.module";

@NgModule({
  declarations: [
    AppSelectComponent,
    ProgressBarComponent,
    FullscreenComponent,
    PlayerControlsComponent,
    PlayerSettingsComponent,
    VideoTimePipe,
  ],
  exports: [PlayerControlsComponent, VideoTimePipe],
  imports: [CommonModule, DialogModule, CdkOverlayOrigin, AppInputRangeModule, VideoCustomizationModule],
})
export class PlayerControlsModule {}
