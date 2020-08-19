import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSOComponent } from './edit-so.component';

describe('EditSOComponent', () => {
  let component: EditSOComponent;
  let fixture: ComponentFixture<EditSOComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSOComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
