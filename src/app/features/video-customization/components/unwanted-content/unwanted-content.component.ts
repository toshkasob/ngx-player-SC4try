import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-unwanted-content',
  templateUrl: './unwanted-content.component.html',
  styleUrls: ['./unwanted-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnwantedContentComponent {
  public left: number;
  public width: number;
}
