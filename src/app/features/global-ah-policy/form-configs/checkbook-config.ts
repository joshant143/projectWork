import { FieldConfig, RegionName } from '../models/region.model';
import {
  AME_POLICY_CLAIM_FORM_CONFIGS,
  ANZ_POLICY_CLAIM_FORM_CONFIGS,
  UK_POLICY_CLAIM_FORM_CONFIGS,
} from './checkbook';

// Single source: Region -> Policy Type -> Claim Type templates.
export const REGION_POLICY_CLAIM_FORM_CONFIGS: Record<
  RegionName,
  Record<string, Record<string, FieldConfig[]>>
> = {
  AME: AME_POLICY_CLAIM_FORM_CONFIGS,
  ANZ: ANZ_POLICY_CLAIM_FORM_CONFIGS,
  UK: UK_POLICY_CLAIM_FORM_CONFIGS,
};
