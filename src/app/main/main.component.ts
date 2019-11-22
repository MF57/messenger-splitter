import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Person, PeopleService} from '../service/people.service';
import {Debt} from '../model/model';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public people: Person[] = [];
  public unassignedDebts: Debt[] = [];

  public connectedTo = ["unassigned-list"];

  constructor(private peopleService: PeopleService, private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.peopleService.getPeople().subscribe(people => {
      this.people = people;
      this.people.forEach(person => {
        this.connectedTo.push(person.id);
      })
    })
  }


  addUnassignedDebt(): void {
    if (this.unassignedDebts.length <= 5) {
      this.unassignedDebts.push(new Debt("1", "Fasolka po Bretońsku", 15))
    }
  }


  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    console.log(this.people);
    this.changeDetector.detectChanges();
  }

  save() {
    this.peopleService.save(this.people).subscribe(result => {
        alert(result);
      }
    )
  }

}
