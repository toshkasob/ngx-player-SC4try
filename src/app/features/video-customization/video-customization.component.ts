import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Customization } from './models/customizations.interface';
import { CustomizationService } from './services/customization.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-video-customization',
  templateUrl: './video-customization.component.html',
  styleUrls: ['./video-customization.component.scss'],
})
export class VideoCustomizationComponent {
  @Input() customizations: Customization[];
  @Output() close = new EventEmitter<void>();

  constructor(public customizationService: CustomizationService) {}

  public isMouseEnter = false;

  public mouseenter(): void {
    this.isMouseEnter = true;
  }

  public closeSettings(): void {
    if (this.isMouseEnter) {
      this.isMouseEnter = false;
      this.close.emit();
    }
  }

  public changeSetting(behaviorSubject: BehaviorSubject<number>, event: number): void {
    behaviorSubject.next(event);
  }
}
