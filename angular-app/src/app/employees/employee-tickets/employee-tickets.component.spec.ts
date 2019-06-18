import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTicketsComponent } from './employee-tickets.component';

describe('EmployeeTicketsComponent', () => {
  let component: EmployeeTicketsComponent;
  let fixture: ComponentFixture<EmployeeTicketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
