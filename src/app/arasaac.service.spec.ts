import { TestBed } from '@angular/core/testing';

import { ArasaacService } from './arasaac.service';

describe('ArasaacService', () => {
  let service: ArasaacService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArasaacService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
