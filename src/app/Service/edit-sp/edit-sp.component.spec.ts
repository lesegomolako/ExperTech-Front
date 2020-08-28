import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSPComponent } from './edit-sp.component';

describe('EditSPComponent', () => {
  let component: EditSPComponent;
  let fixture: ComponentFixture<EditSPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
