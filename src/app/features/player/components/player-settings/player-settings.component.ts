import { Component, Inject } from '@angular/core';
import { DialogRef } from "../../../dialog/dialog-ref";
import { DIALOG_DATA } from "../../../dialog/dialog-tokens";

@Component({
  selector: 'app-player-settings',
  templateUrl: './player-settings.component.html',
  styleUrls: ['./player-settings.component.scss']
})
export class PlayerSettingsComponent {
  constructor(
    private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: string
  ) {}

  close() {
    this.dialogRef.close();
  }
}
