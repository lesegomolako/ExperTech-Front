import { TestBed } from '@angular/core/testing';

import { ExperTexhService } from './exper-texh.service';

describe('ExperTexhService', () => {
  let service: ExperTexhService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExperTexhService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
