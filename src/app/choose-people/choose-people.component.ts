import {Component, OnInit} from '@angular/core';
import {FbService} from '../service/fb.service';
import {Person} from '../model/model';
import {PeopleService} from '../service/people.service';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-choose-people',
  templateUrl: './choose-people.component.html',
  styleUrls: ['./choose-people.component.scss']
})
export class ChoosePeopleComponent implements OnInit {

  availablePeople: Person[] = [];
  chosenPeople: Person[] = [];

  constructor(private fbService: FbService, private peopleService: PeopleService, private router: Router) {
  }

  ngOnInit() {
    this.fbService.getAvailablePeople().subscribe(fbResult => {
      console.log(fbResult);
      this.availablePeople = fbResult.map(entry => {
        const fbPerson = entry[0];
        return new Person(fbPerson.id, fbPerson.first_name + ' ' + fbPerson.last_name, fbPerson.profile_pic, []);
      });
      console.log(this.availablePeople);
    });
  }

  toggle(person: Person, checkbox: any) {
    checkbox.toggle();
    this.setPerson(person, checkbox);
  }

  setPerson(person: Person, checkbox: any) {
    if (checkbox._checked) {
      this.chosenPeople.push(person);
    } else {
      this.chosenPeople = this.chosenPeople.filter(p => p !== person);
    }
  }


  save() {
    this.peopleService.setPeople(this.chosenPeople);
    this.router.navigate(['debts']);
  }

}
