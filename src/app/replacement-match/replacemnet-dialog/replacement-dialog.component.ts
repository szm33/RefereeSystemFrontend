import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ArrivalTime} from '../../arrival-time-picker/arrival-time-picker.component';

@Component({
    selector: 'replacement-dialog',
    templateUrl: 'replacement-dialog.html',
})
export class ReplacementDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<ReplacementDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public arrivalTime: ArrivalTime) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

}
