import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { ClaimSubmissionService } from './claim-submission-service';

describe('ClaimSubmissionService', () => {
  let service: ClaimSubmissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ClaimSubmissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
