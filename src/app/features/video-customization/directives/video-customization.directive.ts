import { Directive, ElementRef } from '@angular/core';
import { CustomizationService } from '../services/customization.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { combineLatest, tap } from 'rxjs';
import { ColorblindnessEnum } from '../models/colorblindness.enum';

@UntilDestroy({ checkProperties: true })
@Directive({
  selector: '[appVideoCustomization]',
})
export class VideoCustomizationDirective {
  constructor(private elementRef: ElementRef, private customizationService: CustomizationService) {
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
      this.customizationService.colorblindness$,
      this.customizationService.typeColorblindness$,
    ])
      .pipe(
        tap(([brightness, contrast, saturate, grayscale, invert, colorblindness, typeColorblindness]) => {
          let filler: string;
          if (colorblindness) {
            switch (typeColorblindness) {
              case ColorblindnessEnum.TRITAN:
                filler = "url('#tritanopia')";
                break;
              case ColorblindnessEnum.DEUTAN:
                filler = "url('#deuteranopia')";
                break;
              case ColorblindnessEnum.PROTAN:
                filler = "url('#protanopia')";
                break;
            }
          } else {
            filler = "url('#trueColor')";
          }

          this.elementRef.nativeElement.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) grayscale(${grayscale}%) invert(${invert}%) ${filler}`;
        }),
        untilDestroyed(this),
      )
      .subscribe();
  }
}
