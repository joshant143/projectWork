import { FieldConfig } from '../../../models/region.model';
import {
  AME_MEDICAL_FIELDS,
  AME_OTHERS_FIELDS,
  AME_PA_WEEKLY_FIELDS,
  AME_PS_WEEKLY_FIELDS,
} from './field-sets';

export const AME_GROUP_PA_CLAIM_FIELDS: Record<string, FieldConfig[]> = {
  MEDICAL: AME_MEDICAL_FIELDS,
  PA_WEEKLY: AME_PA_WEEKLY_FIELDS,
  PS_WEEKLY: AME_PS_WEEKLY_FIELDS,
  OTHERS: AME_OTHERS_FIELDS,
};
