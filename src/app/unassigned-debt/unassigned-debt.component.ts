import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Debt} from '../model/model';

@Component({
  selector: 'app-unassigned-debt',
  templateUrl: './unassigned-debt.component.html',
  styleUrls: ['./unassigned-debt.component.scss']
})
export class UnassignedDebtComponent implements OnInit {

  @Input() debt: Debt;
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter();
  @Output() editEvent: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  delete() {
    this.deleteEvent.emit()
  }

  edit() {
    this.editEvent.emit()
  }

}
