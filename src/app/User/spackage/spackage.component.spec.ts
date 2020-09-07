import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpackageComponent } from './spackage.component';

describe('SpackageComponent', () => {
  let component: SpackageComponent;
  let fixture: ComponentFixture<SpackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
