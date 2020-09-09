import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakebookingComponent } from './makebooking.component';

describe('MakebookingComponent', () => {
  let component: MakebookingComponent;
  let fixture: ComponentFixture<MakebookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakebookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakebookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
