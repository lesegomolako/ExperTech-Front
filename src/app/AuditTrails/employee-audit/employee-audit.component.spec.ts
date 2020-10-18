import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAuditComponent } from './employee-audit.component';

describe('EmployeeAuditComponent', () => {
  let component: EmployeeAuditComponent;
  let fixture: ComponentFixture<EmployeeAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeAuditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
