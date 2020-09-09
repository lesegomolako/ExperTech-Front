import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestbComponent } from './requestb.component';

describe('RequestbComponent', () => {
  let component: RequestbComponent;
  let fixture: ComponentFixture<RequestbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
