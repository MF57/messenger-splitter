import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonDebtsComponent } from './person-debts.component';

describe('PersonDebtsComponent', () => {
  let component: PersonDebtsComponent;
  let fixture: ComponentFixture<PersonDebtsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonDebtsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonDebtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
