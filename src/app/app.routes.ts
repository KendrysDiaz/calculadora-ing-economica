import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "dashboard",
    title: "Calculadora Financiera",
    loadComponent: () => import("../app/pages/home/home.component"),
    children: [
      {
        path: "interest-rate",
        title: "Tasa Interes",
        loadComponent: () =>
          import("../app/pages/interest-rate/interest-rate.component"),
      },
      {
        path: "simple-interest",
        title: "Interes Simple",
        loadComponent: () =>
          import("../app/pages/simple-interests/simple-interests.component"),
      },

      {
        path: "compound-interest",
        title: "Interes Compuesto",
        loadComponent: () =>
          import("../app/pages/compound-interest/compound-interest.component"),
      },
      {
        path: "annuities",
        title: "Anualidades",
        loadComponent: () =>
          import("../app/pages/annuities/annuities.component"),
      },
      {
        path: "gradient",
        title: "Gradientes",
        loadComponent: () =>
          import("../app/pages/gradient/gradient.component"),
      },
      {
        path: "tir",
        title: "Tasa Interna de Retorno",
        loadComponent: () =>
          import("../app/pages/tir/tir.component"),
      }
    ],
  },
  {
    path: "",
    redirectTo: "/dashboard/interest-rate",
    pathMatch: "full",
  },
];
