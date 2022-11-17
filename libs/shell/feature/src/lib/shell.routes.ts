import { Routes } from '@angular/router';

export const layoutRoutes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'list',
    loadComponent: () => import('@nx-the-movies/home').then((m) => m.HomeComponent)
  },
  {
    path: 'movie/detail/:id',
    loadComponent: () =>
      import('@nx-the-movies/movie-detail/feature/movie-detail').then((m) => m.MovieDetailComponent)
  },
  {
    path: 'actor/:id',
    loadComponent: () => import('@nx-the-movies/actor').then((m) => m.ActorComponent)
  }
];
