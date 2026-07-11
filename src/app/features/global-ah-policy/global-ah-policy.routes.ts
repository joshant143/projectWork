import { Routes } from '@angular/router';

export const GLOBAL_AH_ROUTES: Routes = [
  {
    path: 'claim-submission',
    loadComponent: () => import('./pages/claim-master/claim-master').then((c) => c.ClaimMaster),
  },
];
