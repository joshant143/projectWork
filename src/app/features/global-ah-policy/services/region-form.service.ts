import { Injectable } from '@angular/core';
import {
  COUNTRY_REGION_MAP,
  REGION_FORM_CONFIGS,
  REGION_POLICY_CLAIM_FORM_CONFIGS,
} from '../form-configs';
import { FieldConfig, RegionFormConfig, RegionName } from '../models/region.model';

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
