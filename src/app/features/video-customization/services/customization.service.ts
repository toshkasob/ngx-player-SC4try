import { Injectable } from '@angular/core';
import { Customization } from '../models/customizations.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomizationService {
  public brightness$ = new BehaviorSubject<number>(100);
  public contrast$ = new BehaviorSubject<number>(100);
  public saturate$ = new BehaviorSubject<number>(100);
  public grayscale$ = new BehaviorSubject<number>(0);
  public invert$ = new BehaviorSubject<number>(0);

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
}
