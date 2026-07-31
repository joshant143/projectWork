import { FieldConfig } from '../../models/region.model';
import { ANZ_CORP_TRAVEL_CLAIM_FIELDS } from './anz/corp-travel';
import { ANZ_EXPAT_INPAT_CLAIM_FIELDS } from './anz/expat-inpat';
import { ANZ_GROUP_PA_CLAIM_FIELDS } from './anz/group-pa';
import { ANZ_LEISURE_TRAVEL_CLAIM_FIELDS } from './anz/leisure-travel';

export type PolicyClaimConfig = Record<string, Record<string, FieldConfig[]>>;

export const ANZ_POLICY_CLAIM_FORM_CONFIGS: PolicyClaimConfig = {
  CORP_TRAVEL: ANZ_CORP_TRAVEL_CLAIM_FIELDS,
  EXPAT_INPAT: ANZ_EXPAT_INPAT_CLAIM_FIELDS,
  GROUP_PA: ANZ_GROUP_PA_CLAIM_FIELDS,
  LEISURE_TRAVEL: ANZ_LEISURE_TRAVEL_CLAIM_FIELDS,
};
