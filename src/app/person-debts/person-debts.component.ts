import {Component, Input, OnInit} from '@angular/core';
import {Person} from '../model/model';

@Component({
  selector: 'app-person-debts',
  templateUrl: './person-debts.component.html',
  styleUrls: ['./person-debts.component.scss']
})
export class PersonDebtsComponent implements OnInit {

  @Input() person: Person;

  constructor() {
  }

  ngOnInit() {
  }


}
