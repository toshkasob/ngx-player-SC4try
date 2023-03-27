import { ChangeDetectorRef, Directive, ElementRef, Input, ViewContainerRef } from '@angular/core';
import { CustomizationService } from '../services/customization.service';
import { UnwantedContentComponent } from '../components/unwanted-content/unwanted-content.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, tap } from 'rxjs';

@UntilDestroy({ checkProperties: true })
@Directive({
  selector: '[unwantedContent]',
})
export class UnwantedContentDirective {
  @Input()
  set unwantedContent(fullTrackTime: string) {
    if (+fullTrackTime > 0) {
      this.createSteps(fullTrackTime);
    }
  }
  constructor(
    private vcr: ViewContainerRef,
    private customizationService: CustomizationService,
    private cdf: ChangeDetectorRef,
  ) {}

  private createSteps(fullTrackTime: string): void {
    this.customizationService.epilepsyProtection$
      .pipe(
        filter(value => {
          if (value) {
            return true;
          } else {
            this.vcr.clear();
            return false;
          }
        }),
        tap(() => {
          this.customizationService.mockTimeForSlowdown.turnOn.map((turnOn, index) => {
            const component = this.vcr.createComponent(UnwantedContentComponent);
            const turnOff = this.customizationService.mockTimeForSlowdown.turnOff[index];
            const trackTime = Number(fullTrackTime);
            component.instance.left = +(turnOn / trackTime).toFixed(2);
            component.instance.width = +((turnOff - turnOn) / trackTime).toFixed(2);
            this.vcr.insert(component.hostView);
          });
          this.cdf.detectChanges();
        }),
        untilDestroyed(this),
      )
      .subscribe();
  }
}
