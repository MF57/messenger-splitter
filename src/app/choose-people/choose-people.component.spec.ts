import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosePeopleComponent } from './choose-people.component';

describe('ChoosePeopleComponent', () => {
  let component: ChoosePeopleComponent;
  let fixture: ComponentFixture<ChoosePeopleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoosePeopleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoosePeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
