import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { orderform} from './orderform.component';

describe('OrderformComponent', () => {
  let component: orderform;
  let fixture: ComponentFixture<orderform>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ orderform ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(orderform);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
