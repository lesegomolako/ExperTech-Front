import { TestBed } from '@angular/core/testing';
import 'jest';

import { StockService } from './stock.service';

describe('StockService', () => {
  let service: StockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

export class StockData
{
  ItemID: any;
  Name: string;
  Description: string;
  Price: string;
  QuantityInStock: any;
}
