import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import { EmitSelectedValue, SelectInterface } from '../../models/select.interface';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './app-select.component.html',
  styleUrls: ['./app-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppSelectComponent),
      multi: true,
    },
  ],
})
export class AppSelectComponent {
  @Input() config!: SelectInterface;
  @Input() currentValue!: number;

  @Output() selected = new EventEmitter<EmitSelectedValue>();

  public selectedValue(value?: number): void {
    this.selected.emit({
      action: this.config.action,
      value: value ?? undefined,
    });
  }
}
