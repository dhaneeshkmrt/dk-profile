import { Injectable, signal } from '@angular/core';
import { Experience } from '../models/experience.model';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  private experienceData: Experience[] = [
    {
      id: 'bnp-paribas',
      company: 'BNP Paribas',
      position: 'Senior Technical Lead',
      duration: '2021 - Present',
      startDate: '2021-03',
      endDate: 'Present',
      location: 'Bangalore, India',
      technologies: ['Angular 15-19', 'TypeScript', 'NgRx', 'Nx Monorepo', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'],
      achievements: [
        'Led architecture and development of MyCreditApp with 25+ repositories',
        'Reduced bundle size by 75% through optimization techniques',
        'Founded and led Angular Community of Practice (India) with 50+ developers',
        'Designed and implemented custom Design System Library',
        'Mentored 15+ junior developers across multiple teams'
      ],
      responsibilities: [
        'Lead technical architecture decisions for credit application platform',
        'Manage Nx monorepo with 25+ Angular applications and libraries',
        'Conduct code reviews and maintain coding standards across teams',
        'Drive Angular Community of Practice initiatives and knowledge sharing',
        'Collaborate with stakeholders on technical roadmap and feature planning'
      ],
      projectHighlights: [
        {
          name: 'MyCreditApp Platform',
          description: 'Enterprise credit application platform serving millions of users',
          impact: '40% reduction in application processing time',
          technologies: ['Angular 19', 'NgRx', 'Nx', 'Node.js', 'PostgreSQL']
        },
        {
          name: 'Design System Library',
          description: 'Comprehensive component library used across 25+ applications',
          impact: '60% faster feature development across teams',
          technologies: ['Angular', 'Storybook', 'SCSS', 'Angular Material']
        }
      ],
      isExpanded: false
    },
    {
      id: 'enact-systems',
      company: 'Enact Systems',
      position: 'Senior Software Engineer',
      duration: '2020 - 2021',
      startDate: '2020-01',
      endDate: '2021-03',
      location: 'Bangalore, India',
      technologies: ['Angular 10-12', 'TypeScript', 'RxJS', 'Node.js', 'Express', 'MongoDB', 'AWS'],
      achievements: [
        'Reduced user onboarding time from 15 minutes to 5 minutes',
        'Achieved 75% bundle size reduction through lazy loading and optimization',
        'Implemented white-label functionality serving 10+ clients',
        'Led migration from Angular 8 to Angular 12'
      ],
      responsibilities: [
        'Develop and maintain solar monitoring platform',
        'Implement responsive designs and cross-browser compatibility',
        'Optimize application performance and bundle sizes',
        'Collaborate with UI/UX team on user experience improvements'
      ],
      projectHighlights: [
        {
          name: 'Solar Monitoring Platform',
          description: 'Real-time solar energy monitoring and analytics platform',
          impact: 'Serving 50,000+ solar installations worldwide',
          technologies: ['Angular 12', 'D3.js', 'WebSockets', 'Node.js']
        },
        {
          name: 'White-label Solution',
          description: 'Configurable platform for multiple solar energy companies',
          impact: 'Enabled 10+ companies to deploy custom-branded solutions',
          technologies: ['Angular', 'SCSS Variables', 'Dynamic Theming']
        }
      ],
      isExpanded: false
    },
    {
      id: 'epam-systems',
      company: 'Epam Systems',
      position: 'Senior Software Engineer',
      duration: '2018 - 2020',
      startDate: '2018-06',
      endDate: '2020-01',
      location: 'Hyderabad, India',
      technologies: ['Angular Dart', 'Dart', 'Angular 6-8', 'TypeScript', 'Firebase', 'GCP'],
      achievements: [
        'Implemented cloud learning platform with Angular Dart',
        'Achieved 100% unit test coverage across all modules',
        'Integrated Google Analytics for comprehensive user tracking',
        'Led knowledge sharing sessions on Angular Dart'
      ],
      responsibilities: [
        'Develop cloud-based learning management system',
        'Implement comprehensive testing strategies',
        'Integrate third-party APIs and services',
        'Maintain high code quality standards'
      ],
      projectHighlights: [
        {
          name: 'Cloud Learning Platform',
          description: 'Comprehensive e-learning platform with video streaming',
          impact: '10,000+ active learners across multiple courses',
          technologies: ['Angular Dart', 'Firebase', 'Video.js', 'Google Analytics']
        }
      ],
      isExpanded: false
    },
    {
      id: 'hr-block',
      company: 'H&R Block',
      position: 'Software Engineer',
      duration: '2016 - 2018',
      startDate: '2016-07',
      endDate: '2018-06',
      location: 'Bangalore, India',
      technologies: ['Angular 4-6', 'TypeScript', 'Electron JS', 'Node.js', 'Express', 'MongoDB'],
      achievements: [
        'Migrated monolithic application to cloud-native architecture',
        'Developed desktop application using Electron JS',
        'Implemented real-time tax calculation engine',
        'Optimized application for offline functionality'
      ],
      responsibilities: [
        'Develop tax preparation software features',
        'Build cross-platform desktop applications',
        'Implement complex business logic for tax calculations',
        'Ensure compliance with financial regulations'
      ],
      projectHighlights: [
        {
          name: 'BlockWorks Online',
          description: 'Cloud-based tax preparation platform',
          impact: 'Processed 1M+ tax returns annually',
          technologies: ['Angular 6', 'Node.js', 'MongoDB', 'AWS']
        },
        {
          name: 'Desktop Tax Software',
          description: 'Cross-platform desktop application for tax professionals',
          impact: 'Used by 5,000+ tax professionals nationwide',
          technologies: ['Electron JS', 'Angular', 'Node.js']
        }
      ],
      isExpanded: false
    },
    {
      id: 'flytxt',
      company: 'Flytxt',
      position: 'Software Engineer',
      duration: '2015 - 2016',
      startDate: '2015-08',
      endDate: '2016-07',
      location: 'Trivandrum, India',
      technologies: ['Angular 2', 'TypeScript', 'Java', 'Spring Boot', 'MySQL', 'Redis'],
      achievements: [
        'Early adopter of Angular 2 during beta phase',
        'Built real-time customer analytics dashboard',
        'Implemented caching strategies reducing load time by 50%',
        'Contributed to mobile marketing automation platform'
      ],
      responsibilities: [
        'Develop customer engagement analytics platform',
        'Build real-time dashboards and reporting tools',
        'Implement data visualization components',
        'Optimize application performance and scalability'
      ],
      projectHighlights: [
        {
          name: 'Customer Analytics Platform',
          description: 'Real-time customer behavior analytics and segmentation',
          impact: 'Analyzed 10M+ customer interactions daily',
          technologies: ['Angular 2', 'D3.js', 'Java', 'Spring Boot', 'Redis']
        }
      ],
      isExpanded: false
    },
    {
      id: 'finastra',
      company: 'Finastra',
      position: 'Junior Software Engineer',
      duration: '2014 - 2015',
      startDate: '2014-06',
      endDate: '2015-08',
      location: 'Bangalore, India',
      technologies: ['AngularJS', 'JavaScript', 'Java', 'Spring', 'Oracle DB', 'REST APIs'],
      achievements: [
        'Developed banking transaction processing modules',
        'Implemented responsive UI components for financial applications',
        'Contributed to core banking system enhancements',
        'Gained expertise in financial domain and regulations'
      ],
      responsibilities: [
        'Develop banking software applications',
        'Build user interfaces for financial transactions',
        'Ensure compliance with banking regulations',
        'Participate in system integration testing'
      ],
      projectHighlights: [
        {
          name: 'Core Banking System',
          description: 'Enterprise banking platform for transaction processing',
          impact: 'Processed $1B+ in daily transactions',
          technologies: ['AngularJS', 'Java', 'Spring', 'Oracle', 'REST APIs']
        }
      ],
      isExpanded: false
    }
  ];

  experiences = signal<Experience[]>(this.experienceData);

  getExperiences() {
    return this.experiences();
  }

  getExperienceById(id: string): Experience | undefined {
    return this.experiences().find(exp => exp.id === id);
  }

  toggleExperience(id: string) {
    this.experiences.update(experiences =>
      experiences.map(exp =>
        exp.id === id ? { ...exp, isExpanded: !exp.isExpanded } : exp
      )
    );
  }

  getExperiencesByTechnology(technology: string): Experience[] {
    return this.experiences().filter(exp =>
      exp.technologies.some(tech =>
        tech.toLowerCase().includes(technology.toLowerCase())
      )
    );
  }

  getExperiencesByCompany(company: string): Experience[] {
    return this.experiences().filter(exp =>
      exp.company.toLowerCase().includes(company.toLowerCase())
    );
  }

  getTechnologiesUsed(): string[] {
    const allTechnologies = this.experiences()
      .flatMap(exp => exp.technologies);
    return [...new Set(allTechnologies)].sort();
  }

  getCompanies(): string[] {
    return this.experiences().map(exp => exp.company);
  }
}