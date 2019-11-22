import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnassignedDebtComponent } from './unassigned-debt.component';

describe('UnassignedDebtComponent', () => {
  let component: UnassignedDebtComponent;
  let fixture: ComponentFixture<UnassignedDebtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnassignedDebtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnassignedDebtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
