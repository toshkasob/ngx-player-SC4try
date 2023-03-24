import { Directive, ElementRef } from '@angular/core';
import { CustomizationService } from '../services/customization.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { combineLatest, tap } from 'rxjs';

@UntilDestroy({ checkProperties: true })
@Directive({
  selector: '[appVideoCustomization]',
})
export class VideoCustomizationDirective {
  constructor(private elementRef: ElementRef, public customizationService: CustomizationService) {
    if (this.elementRef) {
      this.initStreams();
    }
  }

  public initStreams(): void {
    combineLatest([
      this.customizationService.brightness$,
      this.customizationService.contrast$,
      this.customizationService.saturate$,
      this.customizationService.grayscale$,
      this.customizationService.invert$,
    ])
      .pipe(
        tap(([brightness, contrast, saturate, grayscale, invert]) => {
          this.elementRef.nativeElement.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) grayscale(${grayscale}%) invert(${invert}%)`;
        }),
        untilDestroyed(this),
      )
      .subscribe();
  }
}
