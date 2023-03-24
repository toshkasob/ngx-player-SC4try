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
import { fromEvent, interval, map, skip, switchMap, takeUntil, tap } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DOCUMENT } from '@angular/common';
import { EpilepsyWarningComponent } from "./components/epilepsy-warning/epilepsy-warning.component";
import { DialogService } from "../dialog/dialog.service";

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

  constructor(public playerService: PlayerService, @Inject(DOCUMENT) private document: any, private dialog: DialogService) {}

  public ngAfterViewInit(): void {
    this.initVideoStreams();
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
        map(() =>
          this.player.nativeElement !== null
            ? Number(this.player.nativeElement.duration.toFixed(2))
            : 0,
        ),
        map((res) => {
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
      }),
      untilDestroyed(this),
    );

    onPlay$.pipe(switchMap(() => interval(1000).pipe(takeUntil(onPause$)))).subscribe();

    /**
     * ProgressBar & CurrentTrackTime
     */
    fromEvent(this.player.nativeElement, 'timeupdate')
      .pipe(
        map((s) => {
          return this.player.nativeElement !== null
            ? Number(this.player.nativeElement.currentTime.toFixed(2))
            : 0;
        }),
        map((res) => {
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

    this.playerService.timelineMove$.pipe(untilDestroyed(this)).subscribe((progress) => {
      // console.log(progress);
      this.player.nativeElement.currentTime = this.player.nativeElement.duration * (progress / 100);
    });

    this.playerService.isFullscreenActive$
      .pipe(
        skip(1),
        tap((value) => {
          value
            ? this.playerContainer.nativeElement.requestFullscreen()
            : this.document.exitFullscreen();
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
        tap((speed) => {
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
}
