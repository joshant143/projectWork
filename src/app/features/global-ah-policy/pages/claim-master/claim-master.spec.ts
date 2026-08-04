import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ClaimMaster } from './claim-master';
import { ClaimSubmissionService } from '../../services/claim-submission-service';

const claimSubmissionServiceMock = {
  getPolicyCountries: () => of([]),
  getPolicyTypes: () => of([]),
  getClaimTypes: () => of([]),
  saveInitialClaimDetails: () => of({ success: true, message: 'Saved' }),
};

describe('ClaimMaster', () => {
  let component: ClaimMaster;
  let fixture: ComponentFixture<ClaimMaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClaimMaster],
      providers: [{ provide: ClaimSubmissionService, useValue: claimSubmissionServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(ClaimMaster);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
