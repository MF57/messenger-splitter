import {Component, Input, OnInit} from '@angular/core';
import {Person} from '../service/people.service';
import {Debt} from '../model/model';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-person-debts',
  templateUrl: './person-debts.component.html',
  styleUrls: ['./person-debts.component.scss']
})
export class PersonDebtsComponent implements OnInit {

  @Input() person: Person;

  constructor() { }

  ngOnInit() {
  }


}
