import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then(m => m.HomeComponent),
    title: 'Dhaneesh Kumar T - Senior Technical Lead | Angular Expert'
  },
  {
    path: 'experience',
    loadComponent: () => import('./features/experience/experience').then(m => m.ExperienceComponent),
    title: 'Experience - Dhaneesh Kumar T'
  },
  {
    path: 'projects',
    loadComponent: () => import('./features/projects/projects').then(m => m.ProjectsComponent),
    title: 'Projects - Dhaneesh Kumar T'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
