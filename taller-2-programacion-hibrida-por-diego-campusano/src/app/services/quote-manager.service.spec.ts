import { TestBed } from '@angular/core/testing';

import { QuoteManagerService } from './quote-manager.service';

describe('QuoteManagerService', () => {
  let service: QuoteManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuoteManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
