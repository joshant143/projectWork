import { FieldConfig } from '../../models/region.model';
import { UK_CORP_TRAVEL_CLAIM_FIELDS } from './uk/corp-travel';

export type PolicyClaimConfig = Record<string, Record<string, FieldConfig[]>>;

export const UK_POLICY_CLAIM_FORM_CONFIGS: PolicyClaimConfig = {
  CORP_TRAVEL: UK_CORP_TRAVEL_CLAIM_FIELDS,
};
