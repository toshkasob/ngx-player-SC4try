import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  ViewChild,
} from '@angular/core';
import { PlayerService } from '../../services/player.service';
import {
  mdiCog,
  mdiFullscreen,
  mdiFullscreenExit,
  mdiPause,
  mdiPlay,
  mdiVolumeHigh,
  mdiVolumeOff,
} from '@mdi/js';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { tap } from 'rxjs';
import { AppInputRangeComponent } from '../app-input-range/app-input-range.component';
import { DialogService } from '../../../dialog/dialog.service';
import { PlayerSettingsComponent } from '../player-settings/player-settings.component';
import { AvailableActionsEnum } from '../../models/available-actions.enum';
import { EmitSelectedValue } from '../../models/select.interface';

interface Controls {
  play?: string;
  pause?: string;
  rewind?: string;
  forward?: string;
  mdiFullscreen?: string;
  mdiFullscreenExit?: string;
  iconVolume?: string;
  mdiCog?: string;
}

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-player-controls',
  templateUrl: './player-controls.component.html',
  styleUrls: ['./player-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerControlsComponent implements AfterViewInit {
  @ViewChild('inputVolume') inputVolume: ElementRef<AppInputRangeComponent>;

  @Output() clickPlay = new EventEmitter();
  @Output() openCustomization = new EventEmitter<void>();

  @HostListener('document:fullscreenchange', ['$event'])
  fullscreen(event) {
    this.isDocFullscreen = !!document.fullscreenElement;
  }

  public isDocFullscreen = false;


  public controls: Controls = {
    play: mdiPlay,
    pause: mdiPause,
    // rewind: mdiRewind,
    // forward: mdiFastForward,
    mdiFullscreen: mdiFullscreen,
    mdiFullscreenExit: mdiFullscreenExit,
    iconVolume: mdiVolumeHigh,
    mdiCog: mdiCog,
  };

  constructor(public playerService: PlayerService, private dialog: DialogService) {}

  public ngAfterViewInit(): void {
    this.initControlsStream();
  }

  public initControlsStream(): void {
    /**
     * Изменение иконки звука и сохранение предыдущего значения громкости
     */
    this.playerService.volume$
      .pipe(
        tap((val) => {
          this.controls.iconVolume = !val ? mdiVolumeOff : mdiVolumeHigh;
          if (val) this.playerService.beforeMute = val;
        }),
        untilDestroyed(this),
      )
      .subscribe();
  }

  public onClickPlay(value: Event) {
    this.clickPlay.emit(value);
  }

  public getValue(event: Event): number {
    return +(event.target as HTMLInputElement).value;
  }

  public test(e: Event): void {
    console.log(e);
  }

  public onTimelineMove(
    event: MouseEvent,
    timeline: HTMLElement,
    timelineContainer: HTMLElement,
  ): void {
    const mouseX = Math.floor(event.pageX - timeline.getBoundingClientRect().left);
    const progress = mouseX / (timelineContainer.offsetWidth / 100);
    this.playerService.timelineMove$.next(progress);
  }

  // save(data: any, dialog: DialogComponent | HTMLDialogElement) {
  //   dialog.close();
  // }

  public openSettings(): void {
    const dialogRef = this.dialog.open(PlayerSettingsComponent, { data: 'John' });

    dialogRef.afterClosed().subscribe(() => {
      // Subscription runs after the dialog closes
      console.log('Dialog closed!');
    });
  }

  public doAction(selectedValue: EmitSelectedValue): void {
    console.log(selectedValue);
    switch (selectedValue.action) {
      case AvailableActionsEnum.OPEN_SETTINGS:
        this.openCustomization.emit();
        break;
      case AvailableActionsEnum.CHANGE_SPEED:
        this.playerService.currentSpeed$.next(selectedValue.value);
        break;
    }
  }
}
