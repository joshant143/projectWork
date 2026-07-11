import { TestBed } from '@angular/core/testing';

import { ClaimSubmissionService } from './claim-submission-service';

describe('ClaimSubmissionService', () => {
  let service: ClaimSubmissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClaimSubmissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
