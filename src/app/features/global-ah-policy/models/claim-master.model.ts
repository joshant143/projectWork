export interface PolicyCountry {
  countryCode: string;
  countryName: string;
  policyTypes?: PolicyType[];
}
export interface PolicyType {
  policyTypeCode: string;
  policyTypeName: string;
  claimTypes?: ClaimType[];
}
export interface ClaimType {
  claimTypeCode: string;
  claimTypeName: string;
}
