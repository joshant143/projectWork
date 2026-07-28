import { Injectable } from '@angular/core';
import { REGION_FORM_CONFIGS } from '../form-configs/region-config';
import { REGION_POLICY_CLAIM_FORM_CONFIGS } from '../form-configs/checkbook-config';
import { FieldConfig, RegionFormConfig, RegionName } from '../models/region.model';
import { COUNTRY_REGION_MAP } from '../form-configs/region-config';

@Injectable({
  providedIn: 'root',
})
export class RegionFormService {
  getRegionByCountry(countryCode: string): RegionName | null {
    return COUNTRY_REGION_MAP[countryCode] ?? null;
  }

  getRegionFormConfig(region: RegionName): RegionFormConfig {
    return REGION_FORM_CONFIGS[region];
  }

  getClaimTypeFormConfig(
    region: RegionName,
    claimTypeCode: string,
    policyTypeCode?: string,
  ): FieldConfig[] {
    if (!policyTypeCode) {
      return [];
    }

    return REGION_POLICY_CLAIM_FORM_CONFIGS[region]?.[policyTypeCode]?.[claimTypeCode] ?? [];
  }
}
