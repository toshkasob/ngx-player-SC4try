import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { PlayerService } from './services/player.service';
import { PlayerControlsModule } from './components/player-controls/player-controls.module';
import { DialogModule } from '../dialog/dialog.module';
import { VideoCustomizationModule } from '../video-customization/video-customization.module';

@NgModule({
  declarations: [PlayerComponent],
  imports: [CommonModule, PlayerControlsModule, DialogModule, VideoCustomizationModule],
  exports: [PlayerComponent],
  providers: [PlayerService],
})
export class PlayerModule {}
