import { ChangeDetectionStrategy, Component } from '@angular/core';
import { typeSkipControl } from '../../../models/epilepsy-protection.enum';
import { mdiAlertOutline, mdiChevronDoubleRight } from '@mdi/js';
import { CustomizationService } from "../../../services/customization.service";

@Component({
  selector: 'app-skip-control',
  templateUrl: './skip-control.component.html',
  styleUrls: ['./skip-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {'class': 'skip-control-wrapper'}
})
export class SkipControlComponent {
  public label: string;
  public typeControl: typeSkipControl;
  public typeSkipControl = typeSkipControl;
  public warning_svg = mdiAlertOutline;
  public action_svg = mdiChevronDoubleRight;

  public loading = false;

  constructor(private customizationService: CustomizationService) {}

  public skip(): void {
    if (this.typeControl === typeSkipControl.ACTION && !this.loading) {
      this.loading = true;
      this.customizationService.doSkip.next()
      this.customizationService.showSkipControl$.next(false);
    }
  }
}
