import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-projects-preview',
  standalone: true,
  imports: [],
  templateUrl: './projects-preview.html',
  styleUrl: './projects-preview.scss'
})
export class ProjectsPreviewComponent {
  projects = signal([
    {
      title: 'MyCreditApp Platform',
      company: 'BNP Paribas',
      description: 'Enterprise credit management platform serving thousands of users with 25+ integrated repositories',
      image: 'assets/images/project-placeholder.jpg',
      achievements: [
        '25+ repositories architecture',
        'Custom Design System Library',
        'Nx monorepo management'
      ],
      tech: ['Angular 16', 'Nx', 'TypeScript', 'SCSS']
    },
    {
      title: 'Solar Monitoring Platform',
      company: 'Enact Systems',
      description: 'White-label solar energy monitoring solution with real-time data visualization and analytics',
      image: 'assets/images/project-placeholder.jpg',
      achievements: [
        '75% bundle size reduction',
        '5-minute onboarding',
        'White-label architecture'
      ],
      tech: ['Angular 10', 'RxJS', 'D3.js', 'Node.js']
    },
    {
      title: 'Cloud Learning Platform',
      company: 'Epam Systems',
      description: 'Educational platform for cloud technologies with interactive courses and certifications',
      image: 'assets/images/project-placeholder.jpg',
      achievements: [
        '100% test coverage',
        'Angular Dart implementation',
        'Google Analytics integration'
      ],
      tech: ['Angular Dart', 'Firebase', 'Testing']
    }
  ]);
}
