import { FieldConfig } from '../../models/region.model';
import { AME_CORP_TRAVEL_CLAIM_FIELDS } from './ame/corp-travel';
import { AME_EXPAT_INPAT_CLAIM_FIELDS } from './ame/expat-inpat';
import { AME_GROUP_PA_CLAIM_FIELDS } from './ame/group-pa';

export type PolicyClaimConfig = Record<string, Record<string, FieldConfig[]>>;

export const AME_POLICY_CLAIM_FORM_CONFIGS: PolicyClaimConfig = {
  CORP_TRAVEL: AME_CORP_TRAVEL_CLAIM_FIELDS,
  EXPAT_INPAT: AME_EXPAT_INPAT_CLAIM_FIELDS,
  GROUP_PA: AME_GROUP_PA_CLAIM_FIELDS,
};
