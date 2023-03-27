import { Injectable } from '@angular/core';
import { Customization } from '../models/customizations.interface';
import { BehaviorSubject } from 'rxjs';
import { ColorblindnessEnum } from '../models/colorblindness.enum';
import { EpilepsyProtectionEnum } from '../models/epilepsy-protection.enum';

@Injectable({
  providedIn: 'root',
})
export class CustomizationService {
  public brightness$ = new BehaviorSubject<number>(100);
  public contrast$ = new BehaviorSubject<number>(100);
  public saturate$ = new BehaviorSubject<number>(100);
  public grayscale$ = new BehaviorSubject<number>(0);
  public invert$ = new BehaviorSubject<number>(0);

  public colorblindness$ = new BehaviorSubject<boolean>(false);
  public typeColorblindness$ = new BehaviorSubject<ColorblindnessEnum>(ColorblindnessEnum.TRITAN);

  public epilepsyProtection$ = new BehaviorSubject<boolean>(true);
  public typeEpilepsyProtection$ = new BehaviorSubject<EpilepsyProtectionEnum>(EpilepsyProtectionEnum.CUT);

  public indexTimeForSlowdown: number = 0;

  public customizations: Customization[] = [
    {
      title: 'Яркость',
      value: this.brightness$,
      maxLength: 200,
    },
    {
      title: 'Контраст',
      value: this.contrast$,
      maxLength: 200,
    },
    {
      title: 'Насыщенность',
      value: this.saturate$,
      maxLength: 200,
    },
    {
      title: 'Оттенки серого',
      value: this.grayscale$,
      maxLength: 100,
    },
    {
      title: 'Инверсия',
      value: this.invert$,
      maxLength: 100,
    },
  ];

  public mockTimeForSlowdown: { turnOn: number[]; turnOff: number[] } = {
    // turnOn: [1.30, 6.30, 14.30],
    // turnOff: [3.65, 9.65, 27.65],
    turnOn: [1, 6, 14],
    turnOff: [3, 9, 27],
  };

  public resetSettings(): void {
    this.brightness$.next(100);
    this.contrast$.next(100);
    this.saturate$.next(100);
    this.grayscale$.next(0);
    this.invert$.next(0);
  }
}
