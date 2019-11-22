import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {PeopleService} from '../service/people.service';
import {Debt, Person} from '../model/model';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MatDialog} from '@angular/material';
import {NewDebtComponent} from '../new-debt/new-debt.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public people: Person[] = [];
  public unassignedDebts: Debt[] = [];

  public connectedTo = ["unassigned-list"];

  constructor(private peopleService: PeopleService, private changeDetector: ChangeDetectorRef, public dialog: MatDialog) { }

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
      const dialogRef = this.dialog.open(NewDebtComponent, {
        data: new Debt("1", "", 0)
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        if (result) {
          this.unassignedDebts.push(result);
        }
      });

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
