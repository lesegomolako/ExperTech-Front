import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSOComponent } from './delete-so.component';

describe('DeleteSOComponent', () => {
  let component: DeleteSOComponent;
  let fixture: ComponentFixture<DeleteSOComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteSOComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
