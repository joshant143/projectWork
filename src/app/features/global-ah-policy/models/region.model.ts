import { FormGroup, ValidatorFn } from '@angular/forms';

export type RegionName = 'AME' | 'ANZ' | 'UK';

export type FieldType = 'text' | 'textarea' | 'date' | 'select' | 'radio';

export interface FieldOption {
  value: string | boolean;
  label: string;
}

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  options?: FieldOption[];
  validators?: ValidatorFn[];
  multiline?: boolean;
}

export interface RegionFormConfig {
  tripInfoFields: FieldConfig[];
  lossInfoFields: FieldConfig[];
  contactInfoFields: FieldConfig[];
}

export interface ClaimTypeFormSection {
  claimTypeCode: string;
  title: string;
  config: FieldConfig[];
  group: FormGroup;
}
