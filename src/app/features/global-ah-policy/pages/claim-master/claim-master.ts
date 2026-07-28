import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { materialImports } from '../../../../shared/materials/material-imports';

import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { TripInfoPage } from '../trip-info/trip-info-page';
import { LossInfoPage } from '../loss-info/loss-info-page';
import { ContactInfoPage } from '../contact-info/contact-info-page';
import { ClaimTypeFormsPage } from '../claim-type-forms/claim-type-forms';

import { filter, tap } from 'rxjs';
import { ClaimSubmissionService } from '../../services/claim-submission-service';
import { RegionFormService } from '../../services/region-form.service';
import {
  ClaimTypeFormSection,
  FieldConfig,
  RegionFormConfig,
  RegionName,
} from '../../models/region.model';
import { ClaimType, PolicyCountry, PolicyType } from '../../models/claim-master.model';

@Component({
  selector: 'app-claim-master',
  standalone: true,
  imports: [
    CommonModule,
    ...materialImports,
    ReactiveFormsModule,
    TripInfoPage,
    LossInfoPage,
    ContactInfoPage,
    ClaimTypeFormsPage,
  ],
  templateUrl: './claim-master.html',
  styleUrl: './claim-master.css',
})
export class ClaimMaster implements OnInit {
  private fb = inject(FormBuilder);
  private claimService = inject(ClaimSubmissionService);
  private regionService = inject(RegionFormService);

  claimForm!: FormGroup;

  showClaimForm = signal(false);
  showUploadForm = signal(false);
  showOtherClaimType = signal(false);
  showStepForms = signal(false);
  showClaimTypeForms = signal(false);

  countries: PolicyCountry[] = [];
  policyTypes: PolicyType[] = [];
  claimTypes: ClaimType[] = [];
  selectedRegion: RegionName | null = null;
  regionConfig: RegionFormConfig | null = null;
  selectedClaimTypeCodes: string[] = [];
  claimTypeFormSections: ClaimTypeFormSection[] = [];

  get tripInfoGroup(): FormGroup {
    return this.claimForm.get('tripInfo') as FormGroup;
  }

  get lossInfoGroup(): FormGroup {
    return this.claimForm.get('lossInfo') as FormGroup;
  }

  get contactInfoGroup(): FormGroup {
    return this.claimForm.get('contactInfo') as FormGroup;
  }

  get claimTypeFormArray(): FormArray {
    return this.claimForm.get('claimTypeForms') as FormArray;
  }

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

  openStepForms(): void {
    if (!this.canProceed()) {
      this.claimForm.markAllAsTouched();
      return;
    }

    const selectedCountryCode = this.claimForm.get('policyCountry')?.value;
    const region = this.regionService.getRegionByCountry(selectedCountryCode);

    if (!region) {
      console.error('Unknown region for country', selectedCountryCode);
      return;
    }

    this.selectedRegion = region;
    this.regionConfig = this.regionService.getRegionFormConfig(region);
    this.initializeRegionStepForm();

    this.showStepForms.set(true);
    this.showClaimForm.set(false);
    this.showClaimTypeForms.set(false);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  openUploadDocuments(): void {
    this.showClaimForm.set(false);
    this.showStepForms.set(false);
    this.showClaimTypeForms.set(false);
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
    this.showClaimTypeForms.set(false);
  }

  showLanding(): void {
    this.showStepForms.set(false);
    this.showClaimForm.set(false);
    this.showUploadForm.set(false);
    this.showClaimTypeForms.set(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  showClaimStep(): void {
    this.showStepForms.set(false);
    this.showClaimTypeForms.set(false);
    this.showClaimForm.set(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private initializeForm(): void {
    this.claimForm = this.fb.group(
      {
        companyName: ['', [Validators.maxLength(200)]],
        policyNumber: ['', [Validators.maxLength(200)]],
        claimNumber: [''],
        policyCountry: ['', Validators.required],
        policyType: [{ value: '', disabled: true }, Validators.required],
        claimType: [{ value: '', disabled: true }, Validators.required],
        otherClaimType: ['', [Validators.maxLength(200)]],
        tripInfo: this.fb.group({}),
        lossInfo: this.fb.group({}),
        contactInfo: this.fb.group({}),
        claimTypeForms: this.fb.array([]),
      },
      {
        validators: this.atLeastOneIdnetifierValidator,
      },
    );
  }

  private initializeRegionStepForm(): void {
    if (!this.regionConfig) {
      return;
    }

    this.claimForm.setControl('tripInfo', this.buildSectionGroup(this.regionConfig.tripInfoFields));
    this.claimForm.setControl('lossInfo', this.buildSectionGroup(this.regionConfig.lossInfoFields));
    this.claimForm.setControl(
      'contactInfo',
      this.buildSectionGroup(this.regionConfig.contactInfoFields),
    );
  }

  private buildSectionGroup(fields: FieldConfig[]): FormGroup {
    const controls: Record<string, any> = {};

    fields.forEach((field) => {
      controls[field.name] = ['', field.validators ?? []];
    });

    return this.fb.group(controls);
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
    if (this.tripInfoGroup.invalid || this.lossInfoGroup.invalid || this.contactInfoGroup.invalid) {
      this.tripInfoGroup.markAllAsTouched();
      this.lossInfoGroup.markAllAsTouched();
      this.contactInfoGroup.markAllAsTouched();
      return;
    }

    const selectedClaimTypes = this.claimForm.get('claimType')?.value ?? [];

    if (!selectedClaimTypes.length) {
      this.claimForm.get('claimType')?.setErrors({ required: true });
      return;
    }

    this.selectedClaimTypeCodes = selectedClaimTypes;
    this.buildClaimTypeForms(selectedClaimTypes);

    this.showStepForms.set(false);
    this.showClaimTypeForms.set(true);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  private buildClaimTypeForms(claimTypeCodes: string[]): void {
    this.claimTypeFormArray.clear();
    this.claimTypeFormSections = [];
    const selectedPolicyTypeCode = this.claimForm.get('policyType')?.value as string | undefined;

    claimTypeCodes.forEach((claimTypeCode) => {
      const config = this.regionService.getClaimTypeFormConfig(
        this.selectedRegion as RegionName,
        claimTypeCode,
        selectedPolicyTypeCode,
      );
      const claimType = this.claimTypes.find((item) => item.claimTypeCode === claimTypeCode);

      const group = this.fb.group(
        config.reduce(
          (acc, field) => {
            acc[field.name] = ['', field.validators ?? []];
            return acc;
          },
          {} as Record<string, any>,
        ),
      );

      this.claimTypeFormArray.push(group);
      this.claimTypeFormSections.push({
        claimTypeCode,
        title: claimType?.claimTypeName ?? 'Claim Details',
        config,
        group,
      });
    });
  }

  submitClaim(): void {
    if (this.claimTypeFormArray.invalid) {
      this.claimTypeFormArray.markAllAsTouched();
      return;
    }

    const { claimTypeForms, ...basePayload } = this.claimForm.getRawValue();
    const collectivePayload = {
      ...basePayload,
      claimTypeForms: this.claimTypeFormSections.reduce(
        (acc, section, index) => {
          acc[section.claimTypeCode] = claimTypeForms[index] ?? section.group.getRawValue();
          return acc;
        },
        {} as Record<string, unknown>,
      ),
    };

    console.log('Claim submitted', collectivePayload);
  }

  reset(): void {
    this.claimForm.reset();

    this.policyTypes = [];
    this.claimTypes = [];
    this.selectedRegion = null;
    this.regionConfig = null;
    this.selectedClaimTypeCodes = [];
    this.claimTypeFormSections = [];

    this.claimForm.get('policyType')?.disable();
    this.claimForm.get('claimType')?.disable();
    this.claimTypeFormArray.clear();
  }
}
