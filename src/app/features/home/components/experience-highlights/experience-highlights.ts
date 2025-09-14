import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-experience-highlights',
  standalone: true,
  imports: [],
  templateUrl: './experience-highlights.html',
  styleUrl: './experience-highlights.scss'
})
export class ExperienceHighlightsComponent {
  experiences = signal([
    {
      company: 'BNP Paribas',
      role: 'Senior Technical Lead',
      period: '2021 - Present',
      highlights: [
        'Leading Angular Community of Practice across India',
        'Managing 25+ repositories and design system governance',
        'Architecting MyCreditApp platform for enterprise users'
      ],
      tech: ['Angular 19', 'Nx Monorepo', 'Design Systems', 'Angular Material' ]
    },
    {
      company: 'Enact Systems',
      role: 'Senior Software Engineer',
      period: '2019 - 2021',
      highlights: [
        'Reduced onboarding time from 15 to 5 minutes',
        'Achieved 75% bundle size reduction',
        'Built white-label solar monitoring platform'
      ],
      tech: ['Angular 15', 'TypeScript', 'Performance Optimization']
    },
    {
      company: 'EPAM Systems',
      role: 'Software Engineer',
      period: '2017 - 2019',
      highlights: [
        'Developed cloud learning platform with Angular Dart',
        'Achieved 100% test coverage',
        'Integrated Google Analytics for user insights'
      ],
      tech: ['Angular Dart', 'Testing', 'Analytics']
    }
  ]);
}
