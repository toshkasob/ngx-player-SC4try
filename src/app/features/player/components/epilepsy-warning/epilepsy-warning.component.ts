import { Component, Inject } from '@angular/core';
import { DialogRef } from '../../../dialog/dialog-ref';
import { DIALOG_DATA } from '../../../dialog/dialog-tokens';

@Component({
  selector: 'app-epilepsy-warning',
  templateUrl: './epilepsy-warning.component.html',
  styleUrls: ['./epilepsy-warning.component.scss'],
})
export class EpilepsyWarningComponent {
  constructor(private dialogRef: DialogRef, @Inject(DIALOG_DATA) public data: { team: string, event: string }) {}

  close() {
    this.dialogRef.close();
  }
}
