import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, delay, Observable, of, throwError } from 'rxjs';
import { CLAIM_API_ENDPOINTS } from '../../../core/constant/api-endpoints';
import {
  ClaimTypesResponse,
  GetClaimTypesRequest,
  GetPolicyTypesRequest,
  PolicyCountriesResponse,
  PolicyTypesResponse,
  SaveInitialClaimDetailsRequest,
  SaveInitialClaimDetailsResponse,
} from '../models/claim-api.model';
import { PolicyCountry } from '../models/claim-master.model';
import { CLAIM_MASTER_DATA } from '../mock-data/claim-master.data';
// import { CLAIM_MASTER_DATA } from '../mock-data/claim-master.data';

@Injectable({
  providedIn: 'root',
})
export class ClaimSubmissionService {
  constructor(private readonly http: HttpClient) {}

  getPolicyCountries(): Observable<PolicyCountry[]> {
    // return this.http
    //   .get<PolicyCountriesResponse>(CLAIM_API_ENDPOINTS.policyCountries)
    //   .pipe(catchError(this.handleHttpError('load policy countries')));

    return of(CLAIM_MASTER_DATA).pipe(delay(500));
  }

  getPolicyTypes(payload: GetPolicyTypesRequest): Observable<PolicyTypesResponse> {
    // return this.http
    //   .post<PolicyTypesResponse>(CLAIM_API_ENDPOINTS.policyTypes, payload)
    //   .pipe(catchError(this.handleHttpError('load policy types')));
    return of(
      CLAIM_MASTER_DATA.find((item) => item.countryCode === payload.policyCountry)?.policyTypes ??
        [],
    ).pipe(delay(500));
  }

  getClaimTypes(payload: GetClaimTypesRequest): Observable<ClaimTypesResponse> {
    // return this.http
    //   .post<ClaimTypesResponse>(CLAIM_API_ENDPOINTS.claimTypes, payload)
    //   .pipe(catchError(this.handleHttpError('load claim types')));
    return of(
      CLAIM_MASTER_DATA.find(
        (item) => item.countryCode === payload.policyCountry,
      )?.policyTypes?.find((type) => type.policyTypeCode === payload.policyType)?.claimTypes ?? [],
    ).pipe(delay(500));
  }

  saveInitialClaimDetails(
    payload: SaveInitialClaimDetailsRequest,
  ): Observable<SaveInitialClaimDetailsResponse> {
    return this.http
      .post<SaveInitialClaimDetailsResponse>(CLAIM_API_ENDPOINTS.saveInitialClaimDetails, payload)
      .pipe(catchError(this.handleHttpError('save initial claim details')));
  }

  private handleHttpError(action: string) {
    return (error: HttpErrorResponse) => {
      const backendMessage =
        typeof error.error === 'string'
          ? error.error
          : ((error.error?.message as string | undefined) ??
            (error.error?.error as string | undefined));

      const message = backendMessage || `Unable to ${action}. Please try again.`;

      return throwError(() => new Error(message));
    };
  }
}
