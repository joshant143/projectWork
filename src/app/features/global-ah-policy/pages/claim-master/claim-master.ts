import { Component, inject, OnInit, signal } from '@angular/core';
import { materialImports } from '../../../../shared/materials/material-imports';

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { filter, tap } from 'rxjs';
import { ClaimSubmissionService } from '../../services/claim-submission-service';
import { ClaimType, PolicyCountry, PolicyType } from '../../models/claim-master.model';

@Component({
  selector: 'app-claim-master',
  imports: [...materialImports, ReactiveFormsModule],
  templateUrl: './claim-master.html',
  styleUrl: './claim-master.css',
})
export class ClaimMaster implements OnInit {
  private fb = inject(FormBuilder);
  private claimService = inject(ClaimSubmissionService);

  claimForm!: FormGroup;

  showClaimForm = signal(false);
  showOtherClaimType = signal(false);

  countries: PolicyCountry[] = [];
  policyTypes: PolicyType[] = [];
  claimTypes: ClaimType[] = [];

  ngOnInit(): void {
    this.initializeForm();
    this.loadMasterData();
    this.initializeDropdownDependencies();

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

  startNewClaim(): void {
    this.showClaimForm.set(true);
  }

  private initializeForm(): void {
    this.claimForm = this.fb.group({
      companyName: ['', Validators.required],

      policyNumber: ['', Validators.required],

      policyCountry: ['', Validators.required],

      policyType: [{ value: '', disabled: true }, Validators.required],

      claimType: [{ value: '', disabled: true }, Validators.required],

      otherClaimType: [''],
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

  submit(): void {
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
