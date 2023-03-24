import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Customization } from './models/customizations.interface';
import { CustomizationService } from './services/customization.service';
import { BehaviorSubject, distinctUntilChanged } from 'rxjs';
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { ColorblindnessEnum } from "./models/colorblindness.enum";

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-video-customization',
  templateUrl: './video-customization.component.html',
  styleUrls: ['./video-customization.component.scss'],
})
export class VideoCustomizationComponent implements OnInit {
  @Input() customizations!: Customization[];
  @Output() close = new EventEmitter<void>();

  public colorblindnessEnum = ColorblindnessEnum;

  public colorblindness!: boolean;
  public typeColorblindness!: ColorblindnessEnum;
  public epilepsyProtection: boolean = false;
  public actionCutWithProtection: boolean = false;


  constructor(public customizationService: CustomizationService) {}

  public ngOnInit(): void {
    this.customizationService.colorblindness$.pipe(untilDestroyed(this))
      .subscribe(value => {
        this.colorblindness = value;
      })

    this.customizationService.typeColorblindness$.pipe(
      distinctUntilChanged(),
      untilDestroyed(this),
    )
      .subscribe(value => {
        this.typeColorblindness = value;
      })
  }

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

  public toggleProtection(): void {
    this.epilepsyProtection = !this.epilepsyProtection;
  }

  public toggleActionWithProtection(): void {
    this.actionCutWithProtection = !this.actionCutWithProtection;
  }
  }
