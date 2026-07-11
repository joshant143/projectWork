import { Routes } from '@angular/router';

export const routes: Routes = [
    // Default route
  {
    path: '',
    redirectTo: 'claim-submission',
    pathMatch: 'full'
  },

  // Global AH Policy (Public)
  {
    path: '',
    loadChildren: () =>
      import('./features/global-ah-policy/global-ah-policy.routes')
        .then(m => m.GLOBAL_AH_ROUTES)
  },

  // Future routes
  // {
  //   path: 'login',
  //   loadChildren: () =>
  //     import('./features/auth/auth.routes')
  //       .then(m => m.AUTH_ROUTES)
  // },

  {
    path: '**',
    redirectTo: 'claim-submission'
  }
];
