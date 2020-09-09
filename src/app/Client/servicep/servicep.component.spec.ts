import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicepComponent } from './servicep.component';

describe('ServicepComponent', () => {
  let component: ServicepComponent;
  let fixture: ComponentFixture<ServicepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
