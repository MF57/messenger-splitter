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
  public threadContext: string = '';

  receipt: File | null = null;


  public connectedTo = ['unassigned-list'];

  constructor(private peopleService: PeopleService, private changeDetector: ChangeDetectorRef, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.peopleService.getPeople().subscribe(people => {
      this.people = people;
      this.people.forEach(person => {
        this.connectedTo.push(person.id);
      });
      this.threadContext = window['threadContext'];
    });
  }


  addUnassignedDebt(): void {
    if (this.unassignedDebts.length <= 5) {
      const dialogRef = this.dialog.open(NewDebtComponent, {
        width: '500px',
        data: new Debt('1', '', undefined)
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.unassignedDebts.push(result);
        }
      });

    }
  }

  deleteDebt(debt: Debt): void {
    console.log('ELO');
    this.unassignedDebts = this.unassignedDebts.filter(d => d !== debt);
    this.people.forEach(person => {
      person.debts = person.debts.filter(d => d !== debt);
    });
  }


  editDebt(): void {

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
        window['MessengerExtensions'].requestCloseBrowser(function success() {
        }, function error(err) {
          // an error occurred
        });
      }
    );

  }


  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;

      reader.readAsArrayBuffer(file);

      reader.onload = () => {
        this.peopleService.analyzeReceipt(file, reader.result as ArrayBuffer).subscribe(debts => {
          this.unassignedDebts = this.unassignedDebts.concat(debts);
          console.log(this.unassignedDebts);

        });
      };
    }
  }

}
