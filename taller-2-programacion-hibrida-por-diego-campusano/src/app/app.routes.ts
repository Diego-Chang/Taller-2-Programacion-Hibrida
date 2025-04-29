import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'configuration',
    loadComponent: () => import('./pages/configuration/configuration.page').then( m => m.ConfigurationPage)
  },
  {
    path: 'quote-manager',
    loadComponent: () => import('./pages/quote-manager/quote-manager.page').then( m => m.QuoteManagerPage)
  },
];
