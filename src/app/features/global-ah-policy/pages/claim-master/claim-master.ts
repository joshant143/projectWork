import { Component, inject, OnInit, signal } from '@angular/core';
import { materialImports } from '../../../../shared/materials/material-imports';

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { TripInfoPage } from '../trip-info/trip-info-page';
import { LossInfoPage } from '../loss-info/loss-info-page';
import { ContactInfoPage } from '../contact-info/contact-info-page';

import { filter, single, tap } from 'rxjs';
import { ClaimSubmissionService } from '../../services/claim-submission-service';
import { ClaimType, PolicyCountry, PolicyType } from '../../models/claim-master.model';

@Component({
  selector: 'app-claim-master',
  standalone: true,
  imports: [...materialImports, ReactiveFormsModule, TripInfoPage, LossInfoPage, ContactInfoPage],
  templateUrl: './claim-master.html',
  styleUrl: './claim-master.css',
})
export class ClaimMaster implements OnInit {
  private fb = inject(FormBuilder);
  private claimService = inject(ClaimSubmissionService);

  claimForm!: FormGroup;

  showClaimForm = signal(false);
  showUploadForm = signal(false);
  showOtherClaimType = signal(false);
  showStepForms = signal(false);

  countries: PolicyCountry[] = [];
  policyTypes: PolicyType[] = [];
  claimTypes: ClaimType[] = [];

  get tripInfoGroup(): FormGroup {
    return this.claimForm.get('tripInfo') as FormGroup;
  }

  get lossInfoGroup(): FormGroup {
    return this.claimForm.get('lossInfo') as FormGroup;
  }

  get contactInfoGroup(): FormGroup {
    return this.claimForm.get('contactInfo') as FormGroup;
  }

  get claimantDetailsGroup(): FormGroup {
    return this.contactInfoGroup.get('claimantDetails') as FormGroup;
  }

  get reporterDetailsGroup(): FormGroup {
    return this.contactInfoGroup.get('reporterDetails') as FormGroup;
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadMasterData();
    this.initializeDropdownDependencies();

    this.claimantDetailsGroup.disable();
    this.reporterDetailsGroup.disable();
    this.setupClaimantSelection();

    this.claimForm.get('claimType')?.valueChanges.subscribe((values) => {
      const isOthersSelected = values?.includes('OTHERS');

      this.showOtherClaimType.set(isOthersSelected);

      if (isOthersSelected) {
        this.claimForm.get('otherClaimType')?.setValidators([Validators.required]);
      } else {
        this.claimForm.get('otherClaimType')?.clearValidators();

        this.claimForm.get('otherClaimType')?.reset();
      }

      this.claimForm.get('otherClaimType')?.updateValueAndValidity();
    });
  }

  openStepForms(): void {
    if (this.canProceed()) {
      this.showStepForms.set(true);
      this.showClaimForm.set(false);
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }

  openUploadDocuments(): void {
    this.showClaimForm.set(false);
    this.showStepForms.set(false);
    this.showUploadForm.set(true);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  startNewClaim(): void {
    this.reset();
    this.showOtherClaimType.set(false);
    this.showClaimForm.set(true);
    this.showStepForms.set(false);
  }

  showLanding(): void {
    this.showStepForms.set(false);
    this.showClaimForm.set(false);
    this.showUploadForm.set(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  showClaimStep(): void {
    this.showStepForms.set(false);
    this.showClaimForm.set(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private initializeForm(): void {
    this.claimForm = this.fb.group(
      {
        // Claim Details
        companyName: ['', [Validators.maxLength(200)]],

        policyNumber: ['', [Validators.maxLength(200)]],

        claimNumber: [''],

        policyCountry: ['', Validators.required],

        policyType: [{ value: '', disabled: true }, Validators.required],

        claimType: [{ value: '', disabled: true }, Validators.required],

        otherClaimType: ['', [Validators.maxLength(200)]],

        // Trip Information
        tripInfo: this.fb.group({
          departureDate: [''],

          reasonForTravel: [''],

          departureCity: [''],

          destinationCity: [''],

          departureCountry: [''],

          destinationCountry: [''],

          returnDate: [''],
        }),

        // Loss Information
        lossInfo: this.fb.group({
          dateOfLoss: ['', Validators.required],

          descriptionOfLoss: ['', Validators.required],

          whereDidLossOccur: ['', Validators.required],

          reportedToBhsi: [null],
          caseNumber: [''],
        }),
        // Contact Information
        contactInfo: this.fb.group({
          isClaimant: ['', Validators.required],

          // YES ➜ I am the Claimant
          claimantDetails: this.fb.group({
            reporterName: [''],
            reporterDateOfBirth: [''],
            reporterMobile: [''],
            reporterEmail: [''],
            reEnterReporterEmail: [''],
            claimantAddress: [''],
            homeCountry: [''],
          }),

          // NO ➜ Reporting on behalf of someone else
          reporterDetails: this.fb.group({
            claimantName: [''],
            claimantMobile: [''],
            claimantEmail: [''],
            claimantEmailVerify: [''],

            reporterName: [''],
            reporterMobile: [''],
            reporterEmail: [''],

            relationshipToClaimant: [''],
          }),
        }),
      },
      {
        validators: this.atLeastOneIdnetifierValidator,
      },
    );
  }

  private setupClaimantSelection(): void {
    this.contactInfoGroup.get('isClaimant')?.valueChanges.subscribe((value) => {
      if (value === 'YES') {
        this.reporterDetailsGroup.reset();
        this.reporterDetailsGroup.disable();

        this.claimantDetailsGroup.enable();
      } else if (value === 'NO') {
        this.claimantDetailsGroup.reset();
        this.claimantDetailsGroup.disable();

        this.reporterDetailsGroup.enable();
      }
    });
  }

  private loadMasterData(): void {
    this.claimService.getPolicyCountries().subscribe({
      next: (response) => {
        this.countries = response;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  private initializeDropdownDependencies(): void {
    this.claimForm
      .get('policyCountry')
      ?.valueChanges.pipe(
        filter(Boolean),

        tap(() => {
          this.claimForm.patchValue({
            policyType: '',
            claimType: '',
          });

          this.policyTypes = [];
          this.claimTypes = [];

          this.claimForm.get('claimType')?.disable();
        }),
      )
      .subscribe((countryCode) => {
        const selectedCountry = this.countries.find(
          (country) => country.countryCode === countryCode,
        );

        this.policyTypes = selectedCountry?.policyTypes ?? [];

        this.claimForm.get('policyType')?.enable();
      });

    this.claimForm
      .get('policyType')
      ?.valueChanges.pipe(
        filter(Boolean),

        tap(() => {
          this.claimForm.patchValue({
            claimType: '',
          });

          this.claimTypes = [];
        }),
      )
      .subscribe((policyTypeCode) => {
        const selectedPolicyType = this.policyTypes.find(
          (policy) => policy.policyTypeCode === policyTypeCode,
        );

        this.claimTypes = selectedPolicyType?.claimTypes ?? [];

        this.claimForm.get('claimType')?.enable();
      });
  }

  canProceed(): boolean {
    const companyName = this.claimForm?.get('companyName')?.value?.toString().trim();
    const policyNumber = this.claimForm?.get('policyNumber')?.value?.toString().trim();
    const hasClaimType = !!this.claimForm?.get('claimType')?.value?.length;
    const otherClaimType = this.claimForm?.get('otherClaimType')?.value?.toString().trim();
    const isOthersSelected = this.claimForm?.get('claimType')?.value?.includes('OTHERS');

    return (
      !!(companyName || policyNumber) && hasClaimType && (!isOthersSelected || !!otherClaimType)
    );
  }

  private atLeastOneIdnetifierValidator(group: AbstractControl): ValidationErrors | null {
    const companyName = group.get('companyName')?.value?.toString().trim();
    const policyNumber = group.get('policyNumber')?.value?.toString().trim();

    return companyName || policyNumber ? null : { atLeastOneIdentifier: true };
  }

  generateForms(): void {
    if (this.claimForm.invalid) {
      this.claimForm.markAllAsTouched();
      return;
    }

    console.log('Form Submitted', this.claimForm.getRawValue());
  }

  reset(): void {
    this.claimForm.reset();

    this.policyTypes = [];
    this.claimTypes = [];

    this.claimForm.get('policyType')?.disable();
    this.claimForm.get('claimType')?.disable();
  }
}
