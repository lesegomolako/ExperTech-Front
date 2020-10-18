import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAuditComponent } from './client-audit.component';

describe('ClientAuditComponent', () => {
  let component: ClientAuditComponent;
  let fixture: ComponentFixture<ClientAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientAuditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
