import { Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime, fromEvent, Subject, Subscription, tap } from 'rxjs';
import { MenuInterface } from '../models/menu.interface';
import { playerMenu } from '../utils/config';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  public src$ = new BehaviorSubject<string>('');
  public isPlaying$ = new BehaviorSubject<boolean>(false);

  public volume$ = new BehaviorSubject<number>(100);
  public beforeMute: number = 100;

  public mouseMove!: Subscription;
  public changeControlsStyle$ = new BehaviorSubject<boolean>(false);

  public fullTrackTime$ = new BehaviorSubject<number>(0);
  public currentTrackTime$ = new BehaviorSubject<number>(0);
  public progressTrackBuffer$ = new BehaviorSubject<number>(0);
  public timelineMove$ = new Subject<number>();

  public currentSpeed$ = new BehaviorSubject<number>(100);

  public playerMenu: MenuInterface[] = playerMenu;

  public isFullscreenActive$ = new BehaviorSubject<boolean>(false);

  constructor() {}

  public detectMouseMove(elem: HTMLElement): void {
    this.mouseMove = fromEvent(elem, 'mousemove')
      .pipe(
        tap(() => this.changeControlsStyle$.next(false)),
        debounceTime(2500),
        tap(() => {
          if (this.isPlaying$.getValue()) {
            this.changeControlsStyle$.next(true);
          }
        }),
        untilDestroyed(this),
      )
      .subscribe();
  }

  public unsubscribeMouseMove(): void {
    if (this.mouseMove.closed) {
      return;
    }

    this.mouseMove.unsubscribe();
    this.changeControlsStyle$.next(false);
  }

  public updateTrackBuffer(elem: HTMLVideoElement): void {
    const duration = elem.duration;
    if (duration > 0) {
      for (let i = 0; i < elem.buffered.length; i++) {
        if (elem.buffered.start(elem.buffered.length - 1 - i) < elem.currentTime) {
          this.progressTrackBuffer$.next(
            (elem.buffered.end(elem.buffered.length - 1 - i) / duration) * 100,
          );
          break;
        }
      }
    }
  }

  public muteVolume(): void {
    this.volume$.next(!this.volume$.getValue() ? this.beforeMute : 0);
  }

  public toggleFullScreen(isDocFullscreen: boolean): void {
    if (isDocFullscreen) {
      this.isFullscreenActive$.next(false);
    } else {
      this.isFullscreenActive$.next(true);
    }
  }
}
