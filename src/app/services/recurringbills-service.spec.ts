import { TestBed } from '@angular/core/testing';

import { RecurringbillsService } from './recurringbills-service';

describe('RecurringbillsService', () => {
  let service: RecurringbillsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecurringbillsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
