import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Debt} from '../model/model';

@Component({
  selector: 'app-new-debt',
  templateUrl: './new-debt.component.html',
  styleUrls: ['./new-debt.component.scss']
})
export class NewDebtComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<NewDebtComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Debt) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
