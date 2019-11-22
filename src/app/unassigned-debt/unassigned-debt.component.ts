import {Component, Input, OnInit} from '@angular/core';
import {Debt} from '../model/model';

@Component({
  selector: 'app-unassigned-debt',
  templateUrl: './unassigned-debt.component.html',
  styleUrls: ['./unassigned-debt.component.scss']
})
export class UnassignedDebtComponent implements OnInit {

  @Input() debt: Debt;

  constructor() { }

  ngOnInit() {
  }

}
