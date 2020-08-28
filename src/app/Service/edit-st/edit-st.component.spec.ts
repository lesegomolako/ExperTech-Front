import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSTComponent } from './edit-st.component';

describe('EditSTComponent', () => {
  let component: EditSTComponent;
  let fixture: ComponentFixture<EditSTComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSTComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
