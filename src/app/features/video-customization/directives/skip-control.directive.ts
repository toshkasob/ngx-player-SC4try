import { ChangeDetectorRef, Directive, OnInit, ViewContainerRef } from '@angular/core';
import { CustomizationService } from '../services/customization.service';
import { combineLatest, distinctUntilChanged, filter, switchMap, tap } from 'rxjs';
import {
  EpilepsyProtectionEnum,
  labelSkipControl,
  typeSkipControl,
} from '../models/epilepsy-protection.enum';
import { SkipControlComponent } from '../components/skip-control/skip-control/skip-control.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy({ checkProperties: true })
@Directive({
  selector: '[skipControl]',
})
export class SkipControlDirective implements OnInit {
  private showSkipControl = false;

  constructor(
    private vcr: ViewContainerRef,
    private customizationService: CustomizationService,
    private cdf: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    this.turnOnSkipControl();
  }

  private turnOnSkipControl(): void {
    combineLatest([
      this.customizationService.epilepsyProtection$,
      this.customizationService.showSkipControl$,
    ])
      .pipe(
        filter(([epilepsyProtection, showSkipControl]) => {
          this.showSkipControl = showSkipControl
          if (epilepsyProtection && showSkipControl) {
            return true;
          } else {
            this.vcr.clear();
            return false;
          }
        }),
        switchMap(() => this.customizationService.typeEpilepsyProtection$),
        filter(() => this.showSkipControl),
        tap(typeEpilepsyProtection => {
          this.vcr.clear();
          const component = this.vcr.createComponent(SkipControlComponent);

          let label: string;
          let typeControl: typeSkipControl;
          switch (typeEpilepsyProtection) {
            case EpilepsyProtectionEnum.SKIP:
              label = labelSkipControl.SKIP;
              typeControl = typeSkipControl.ACTION;
              break;
            case EpilepsyProtectionEnum.FORCE_SKIP:
              label = labelSkipControl.FORCE_SKIP;
              typeControl = typeSkipControl.WARNING;
              break;
            case EpilepsyProtectionEnum.SLOWDOWN:
              label = labelSkipControl.SLOWDOWN;
              typeControl = typeSkipControl.WARNING;
              break;
            case EpilepsyProtectionEnum.CUT:
              label = labelSkipControl.CUT;
              typeControl = typeSkipControl.WARNING;
              break;
            default:
              label = undefined;
              typeControl = undefined;
          }

          component.instance.typeControl = typeControl;
          component.instance.label = label;
          this.vcr.insert(component.hostView);
          this.cdf.detectChanges();

          setTimeout(() => {this.turnOffSkipControl()}, 7500);
        }),
        untilDestroyed(this),
      )
      .subscribe();
  }

  private turnOffSkipControl(): void {
    this.vcr.clear();
  }
}
