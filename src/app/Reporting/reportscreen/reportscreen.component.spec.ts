import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportscreenComponent } from './reportscreen.component';

describe('ReportscreenComponent', () => {
  let component: ReportscreenComponent;
  let fixture: ComponentFixture<ReportscreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportscreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
