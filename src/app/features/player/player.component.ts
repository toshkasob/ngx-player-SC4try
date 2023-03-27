import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { PlayerService } from './services/player.service';
import {
  combineLatest,
  distinctUntilChanged,
  filter,
  fromEvent,
  interval,
  map,
  skip,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DOCUMENT } from '@angular/common';
import { EpilepsyWarningComponent } from './components/epilepsy-warning/epilepsy-warning.component';
import { DialogService } from '../dialog/dialog.service';
import { CustomizationService } from '../video-customization/services/customization.service';
import { EpilepsyProtectionEnum } from "../video-customization/models/epilepsy-protection.enum";

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerComponent implements AfterViewInit, OnChanges {
  @ViewChild('playerContainer') playerContainer!: ElementRef<HTMLElement>;
  @ViewChild('player') player!: ElementRef<HTMLVideoElement>;
  @Input() src!: string;

  public isCustomizationOpen = false;
  public isMoveOnTrack = false;

  private typeEpilepsyProtection: EpilepsyProtectionEnum;

  constructor(
    public playerService: PlayerService,
    @Inject(DOCUMENT) private document: any,
    private dialog: DialogService,
    private customizationService: CustomizationService,
  ) {}

  public ngAfterViewInit(): void {
    this.initVideoStreams();
    this.initCustomizationStream();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.playerService.src$.next(changes['src'].currentValue);
  }

  public toggleCustomization(value: boolean): void {
    this.isCustomizationOpen = value;
  }

  private initVideoStreams(): void {
    /**
     * Video Duration
     */
    fromEvent(this.player.nativeElement, 'loadedmetadata')
      .pipe(
        map(() => (this.player.nativeElement !== null ? Number(this.player.nativeElement.duration.toFixed(2)) : 0)),
        tap(res => {
          this.playerService.fullTrackTime$.next(res);
        }),
        untilDestroyed(this),
      )
      .subscribe();

    /**
     * play & pause
     */
    const onPlay$ = fromEvent(this.player.nativeElement, 'play').pipe(
      tap(() => {
        this.playerService.isPlaying$.next(true);
        this.playerService.detectMouseMove(this.playerContainer.nativeElement);
      }),
      untilDestroyed(this),
    );

    const onPause$ = fromEvent(this.player.nativeElement, 'pause').pipe(
      tap(() => {
        this.playerService.isPlaying$.next(false);
        this.playerService.unsubscribeMouseMove();
        if (this.player.nativeElement.ended) {
          this.customizationService.indexTimeForSlowdown = 0;
          this.customizationService.showSkipControl$.next(false);
        }
      }),
      untilDestroyed(this),
    );

    onPlay$.pipe(switchMap(() => interval(1000).pipe(takeUntil(onPause$)))).subscribe();

    /**
     * ProgressBar & CurrentTrackTime
     */
    fromEvent(this.player.nativeElement, 'timeupdate')
      .pipe(
        map(() => (this.player.nativeElement !== null ? Number(this.player.nativeElement.currentTime.toFixed(2)) : 0)),
        map(res => {
          this.playerService.currentTrackTime$.next(res);
        }),
        untilDestroyed(this),
      )
      .subscribe();

    /**
     * ProgressBuffer
     */
    fromEvent(this.player.nativeElement, 'progress')
      .pipe(untilDestroyed(this))
      .subscribe(() => this.playerService.updateTrackBuffer(this.player.nativeElement));

    this.playerService.timelineMove$.pipe(untilDestroyed(this)).subscribe(progress => {
      this.player.nativeElement.currentTime = this.player.nativeElement.duration * (progress / 100);
    });

    this.playerService.isFullscreenActive$
      .pipe(
        skip(1),
        tap(value => {
          value ? this.playerContainer.nativeElement.requestFullscreen() : this.document.exitFullscreen();
        }),
        untilDestroyed(this),
      )
      .subscribe();

    /**
     * Скорость видео
     */
    this.playerService.currentSpeed$
      .pipe(
        skip(1),
        tap(speed => {
          this.player.nativeElement.playbackRate = speed / 100;
        }),
        untilDestroyed(this),
      )
      .subscribe();
  }

  public openSettings(): void {
    const dialogRef = this.dialog.open(EpilepsyWarningComponent, {
      data: {
        team: 'SC4try',
        event: 'TrueTechHack',
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      // Subscription runs after the dialog closes
      console.log('Dialog closed!');
    });
  }

  // Подумать над упрощением метода
  private initCustomizationStream(): void {
    // Медленно отрабатывает
    combineLatest([
      this.playerService.currentTrackTime$.pipe(
        distinctUntilChanged((a, b) => Math.floor(a) === Math.floor(b)),
        map(value => Math.floor(value)),
      ),
      this.customizationService.epilepsyProtection$,
    ])
      .pipe(
        filter(([currentTrackTime, epilepsyProtection]) => currentTrackTime > 0 && epilepsyProtection),
        map(([currentTrackTime]) => {
          const turnOn: number[] = this.customizationService.mockTimeForSlowdown.turnOn;
          const turnOff: number[] = this.customizationService.mockTimeForSlowdown.turnOff;
          const activeIndex: number = this.customizationService.indexTimeForSlowdown;

          //Включение опций
          if (currentTrackTime === turnOn[activeIndex]) {
            this.useCustomization();
            this.customizationService.showSkipControl$.next(true);
          }

          //Выключение опций
          if (turnOff[activeIndex] === currentTrackTime) {
            this.useCustomization(false);
            // this.customizationService.showSkipControl$.next(false);
            this.customizationService.indexTimeForSlowdown = activeIndex + 1;
          }
          return currentTrackTime;
        }),
        //Вызов событий при перемотке (нажатием на прогресс бар)
        filter(() => this.isMoveOnTrack),
        tap(currentTrackTime => {
          const timeForSlowdown = this.customizationService.mockTimeForSlowdown;
          const nearestIndex = this.nearestMin(timeForSlowdown.turnOn, currentTrackTime);

          if (
            this.between(
              currentTrackTime,
              timeForSlowdown.turnOff[nearestIndex],
              timeForSlowdown.turnOn[nearestIndex + 1] || Math.ceil(this.player.nativeElement.duration),
            )
          ) {
            this.customizationService.indexTimeForSlowdown =
              timeForSlowdown.turnOn.length === nearestIndex ? 0 : nearestIndex + 1;
            this.useCustomization(false);
            this.customizationService.showSkipControl$.next(false);
          } else {
            this.useCustomization();

            this.customizationService.indexTimeForSlowdown = nearestIndex;
          }
          this.isMoveOnTrack = false;
        }),
        untilDestroyed(this),
      )
      .subscribe();

      this.customizationService.doSkip.pipe(
        tap(() => {
          this.player.nativeElement.currentTime =
            this.customizationService.mockTimeForSlowdown.turnOff[this.customizationService.indexTimeForSlowdown];
        }),
        untilDestroyed(this),
      ).subscribe();

      this.customizationService.typeEpilepsyProtection$.pipe(
        tap(value => {
          this.typeEpilepsyProtection = value
        }),
        untilDestroyed(this),
      ).subscribe()
  }

  private useCustomization(turnOn = true): void {
    console.log(this.typeEpilepsyProtection);
    switch (this.typeEpilepsyProtection) {
      case EpilepsyProtectionEnum.SKIP:
        break;
      case EpilepsyProtectionEnum.FORCE_SKIP:
        this.customizationService.blur$.next(turnOn? 20 : 0)
        this.customizationService.doSkip.next();
        break;
      case EpilepsyProtectionEnum.SLOWDOWN:
        this.playerService.currentSpeed$.next(turnOn? 60 : 100)
        break;
      case EpilepsyProtectionEnum.CUT:
        this.customizationService.colorblindness$.next(turnOn)
        break;
    }
  }

  private between(x: number, min: number, max: number): boolean {
    return x >= min && x <= max;
  }

  private nearestMin(nums: Array<number>, targer: number): number {
    const cutArr = nums.filter(a => a <= targer);
    return cutArr.length - 1;
  }

  private binarySearch(nums: Array<number>, targer: number): number {
    let left = 0;
    let right = nums.length - 1;
    let mid;

    while (left <= right) {
      mid = Math.round((right - left) / 2 + left);

      if (targer === nums[mid]) {
        return mid;
      } else if (targer < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    return -1;
  }
}
