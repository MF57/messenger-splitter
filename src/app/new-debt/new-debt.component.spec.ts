import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDebtComponent } from './new-debt.component';

describe('NewDebtComponent', () => {
  let component: NewDebtComponent;
  let fixture: ComponentFixture<NewDebtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDebtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDebtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
