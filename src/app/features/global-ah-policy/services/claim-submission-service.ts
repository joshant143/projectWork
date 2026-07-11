import { Injectable } from '@angular/core';

import { delay, Observable, of } from 'rxjs';
import { PolicyCountry } from '../models/claim-master.model';
import { CLAIM_MASTER_DATA } from '../mock-data/claim-master.data';

@Injectable({
  providedIn: 'root',
})
export class ClaimSubmissionService {
  getPolicyCountries(): Observable<PolicyCountry[]> {
    return of(CLAIM_MASTER_DATA).pipe(delay(500));

    //return this.http.get<PolicyCountry[]>('api/policy-countries').pipe(delay(500));
  }
}
