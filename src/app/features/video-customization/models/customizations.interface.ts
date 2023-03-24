import { BehaviorSubject } from 'rxjs';

export interface Customization {
  title: string;
  value: BehaviorSubject<number>;
  maxLength?: number;
}
