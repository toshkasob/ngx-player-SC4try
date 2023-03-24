import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-range',
  templateUrl: './app-input-range.component.html',
  styleUrls: ['./app-input-range.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppInputRangeComponent),
      multi: true,
    },
  ],
})
export class AppInputRangeComponent {
  @ViewChild('input') input: HTMLInputElement;
  @Input() value: string | number;
  @Input() maxLength: number = 100;
  @Input() title: string;

  @Output() changes = new EventEmitter();

  public emitValue(event: Event): void {
    this.changes.emit(+(event.target as HTMLInputElement).value);
  }
}
