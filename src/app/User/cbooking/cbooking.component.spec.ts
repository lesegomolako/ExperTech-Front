import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbookingComponent } from './cbooking.component';

describe('CbookingComponent', () => {
  let component: CbookingComponent;
  let fixture: ComponentFixture<CbookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
