import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSTComponent } from './employee-st.component';

describe('EmployeeSTComponent', () => {
  let component: EmployeeSTComponent;
  let fixture: ComponentFixture<EmployeeSTComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeSTComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
