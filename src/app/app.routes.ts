import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    title: 'Calculadora Financiera',
    loadComponent: () => import('../app/pages/home/home.component'),
    children: [
      {
        path: 'presentacion',
        title: 'Presentacion',
        loadComponent: () =>
          import('../app/shared/teamwork/teamwork.component'),
      },
      {
        path: 'interest-rate',
        title: 'Tasa Interes',
        loadComponent: () =>
          import('../app/pages/interest-rate/interest-rate.component'),
      },
      {
        path: 'simple-interest',
        title: 'Interes Simple',
        loadComponent: () =>
          import('../app/pages/simple-interests/simple-interests.component'),
      },

      {
        path: 'compound-interest',
        title: 'Interes Compuesto',
        loadComponent: () =>
          import('../app/pages/compound-interest/compound-interest.component'),
      },
    ],
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
];
