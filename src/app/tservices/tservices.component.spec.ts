import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TServicesComponent } from './tservices.component';

describe('TServicesComponent', () => {
  let component: TServicesComponent;
  let fixture: ComponentFixture<TServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
