import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { materialImports } from '../../../../shared/materials/material-imports';
import { MatSnackBar } from '@angular/material/snack-bar';

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

import { catchError, filter, of, switchMap, tap } from 'rxjs';
import { IWantToOption, SaveInitialClaimDetailsRequest } from '../../models/claim-api.model';
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
  private snackBar = inject(MatSnackBar);
  private destroyRef = inject(DestroyRef);

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
  private iWantToSelection: IWantToOption = 'File a Claim';

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

    this.claimForm
      .get('claimType')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((values: string[] | null) => {
        const isOthersSelected = values?.includes('OTHERS');

        this.showOtherClaimType.set(!!isOthersSelected);

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

    const payload = this.buildInitialClaimDetailsPayload();
    this.proceedToStepForms();
    // this.claimService
    //   .saveInitialClaimDetails(payload)
    //   .pipe(takeUntilDestroyed(this.destroyRef))
    //   .subscribe({
    //     next: (response) => {
    //       if (response.success === false) {
    //         this.showPopup(response.message || 'Unable to save initial claim details.');
    //         return;
    //       }

    //       this.showPopup(
    //         response.message || 'Initial claim details saved successfully.',
    //         'success',
    //       );
    //       this.proceedToStepForms();
    //     },
    //     error: (error: Error) => {
    //       this.showPopup(error.message || 'Unable to save initial claim details.');
    //     },
    //   });
  }

  openUploadDocuments(): void {
    this.iWantToSelection = 'Upload Documents';
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
    this.iWantToSelection = 'File a Claim';
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
    this.claimService
      .getPolicyCountries()
      .pipe(
        catchError((error: Error) => {
          this.showPopup(error.message || 'Unable to load policy countries.');
          return of([]);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((response) => {
        this.countries = response;
      });
  }

  private initializeDropdownDependencies(): void {
    this.claimForm
      .get('policyCountry')
      ?.valueChanges.pipe(
        tap(() => {
          this.claimForm.patchValue({
            policyType: '',
            claimType: '',
          });

          this.policyTypes = [];
          this.claimTypes = [];

          this.claimForm.get('policyType')?.disable();
          this.claimForm.get('claimType')?.disable();
        }),
        filter((countryCode): countryCode is string => !!countryCode),
        switchMap((countryCode) =>
          this.claimService.getPolicyTypes({ policyCountry: countryCode }).pipe(
            catchError((error: Error) => {
              this.showPopup(error.message || 'Unable to load policy types.');
              return of([]);
            }),
          ),
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((policyTypes) => {
        this.policyTypes = policyTypes;

        if (policyTypes.length) {
          this.claimForm.get('policyType')?.enable();
        }
      });

    this.claimForm
      .get('policyType')
      ?.valueChanges.pipe(
        tap(() => {
          this.claimForm.patchValue({
            claimType: '',
          });

          this.claimTypes = [];
          this.claimForm.get('claimType')?.disable();
        }),
        filter((policyTypeCode): policyTypeCode is string => !!policyTypeCode),
        switchMap((policyTypeCode) => {
          const selectedCountryCode = this.claimForm.get('policyCountry')?.value as string;

          return this.claimService
            .getClaimTypes({
              policyCountry: selectedCountryCode,
              policyType: policyTypeCode,
            })
            .pipe(
              catchError((error: Error) => {
                this.showPopup(error.message || 'Unable to load claim types.');
                return of([]);
              }),
            );
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((claimTypes) => {
        this.claimTypes = claimTypes;

        if (claimTypes.length) {
          this.claimForm.get('claimType')?.enable();
        }
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

  private buildInitialClaimDetailsPayload(): SaveInitialClaimDetailsRequest {
    const rawValue = this.claimForm.getRawValue();
    const selectedClaimTypes = (rawValue.claimType as string[] | null) ?? [];

    return {
      iWantTo: this.iWantToSelection,
      companyName: (rawValue.companyName as string | null)?.trim() || '',
      policyNumber: (rawValue.policyNumber as string | null)?.trim() || '',
      policyCountry: (rawValue.policyCountry as string | null) || '',
      policyType: (rawValue.policyType as string | null) || '',
      claimType: selectedClaimTypes.join(','),
      other: (rawValue.otherClaimType as string | null)?.trim() || '',
    };
  }

  private proceedToStepForms(): void {
    const selectedCountryCode = this.claimForm.get('policyCountry')?.value;
    const region = this.regionService.getRegionByCountry(selectedCountryCode);

    if (!region) {
      this.showPopup('Unknown region for selected country.');
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

  private showPopup(message: string, panelClass: 'success' | 'error' = 'error'): void {
    this.snackBar.open(message, 'Close', {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass,
    });
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
