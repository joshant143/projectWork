import { ClaimType, PolicyCountry, PolicyType } from './claim-master.model';

export interface GetPolicyTypesRequest {
  policyCountry: string;
}

export interface GetClaimTypesRequest {
  policyCountry: string;
  policyType: string;
}

export type IWantToOption = 'File a Claim' | 'Upload Documents';

export interface SaveInitialClaimDetailsRequest {
  iWantTo: IWantToOption;
  companyName: string;
  policyNumber: string;
  policyCountry: string;
  policyType: string;
  claimType: string;
  other: string;
}

export interface SaveInitialClaimDetailsResponse {
  success?: boolean;
  message?: string;
  claimReference?: string;
}

export type PolicyCountriesResponse = PolicyCountry[];
export type PolicyTypesResponse = PolicyType[];
export type ClaimTypesResponse = ClaimType[];
