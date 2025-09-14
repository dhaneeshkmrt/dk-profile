import { Injectable, signal } from '@angular/core';
import { Project, ProjectCategory, ProjectStatus, ProjectFilter } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private projectsData: Project[] = [
    {
      id: 'mycreditapp-platform',
      title: 'MyCreditApp Platform',
      company: 'BNP Paribas',
      description: 'Enterprise credit application platform with microservices architecture and 25+ repositories managed through Nx monorepo.',
      longDescription: 'A comprehensive credit application platform that revolutionized the way BNP Paribas handles credit applications. The platform features a modern microservices architecture with 25+ repositories managed through Nx monorepo, custom design system library, and advanced state management.',
      technologies: ['Angular 19', 'NgRx', 'Nx Monorepo', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Docker', 'Kubernetes'],
      features: [
        'Microservices architecture with 25+ repositories',
        'Custom Design System Library with 50+ components',
        'Advanced state management with NgRx',
        'Real-time application status updates',
        'Automated document processing and validation',
        'Multi-language support (English, French)',
        'Role-based access control and security',
        'Comprehensive audit logging and reporting'
      ],
      impact: {
        description: 'Transformed credit application processing efficiency and user experience',
        metrics: [
          { label: 'Processing Time', value: '40% reduction', description: 'From 2 hours to 1.2 hours average' },
          { label: 'Bundle Size', value: '75% reduction', description: 'Optimized from 2MB to 500KB' },
          { label: 'User Satisfaction', value: '95% positive', description: 'Based on user feedback surveys' },
          { label: 'Team Productivity', value: '60% increase', description: 'Using shared design system' }
        ]
      },
      category: ProjectCategory.ENTERPRISE,
      status: ProjectStatus.ONGOING,
      startDate: '2021-03',
      teamSize: 12,
      role: 'Senior Technical Lead & Architect',
      challenges: [
        'Managing complex state across 25+ applications',
        'Ensuring consistency in design and user experience',
        'Optimizing performance with large bundle sizes',
        'Coordinating development across multiple teams'
      ],
      solutions: [
        'Implemented centralized state management with NgRx',
        'Created comprehensive design system with Storybook documentation',
        'Applied advanced optimization techniques including lazy loading and tree shaking',
        'Established Angular Community of Practice for knowledge sharing'
      ]
    },
    {
      id: 'design-system-library',
      title: 'Enterprise Design System Library',
      company: 'BNP Paribas',
      description: 'Comprehensive Angular component library extending Angular Material, used across 25+ applications with Storybook documentation.',
      longDescription: 'A sophisticated design system library that serves as the foundation for all BNP Paribas Angular applications. Built on top of Angular Material with custom components, themes, and comprehensive documentation.',
      technologies: ['Angular', 'Angular Material', 'Storybook', 'SCSS', 'TypeScript', 'Nx', 'Jest', 'Chromatic'],
      features: [
        '50+ reusable Angular components',
        'Comprehensive Storybook documentation',
        'Multiple theme support (light/dark modes)',
        'Accessibility compliance (WCAG 2.1)',
        'Unit test coverage > 95%',
        'Automated visual regression testing',
        'NPM package distribution',
        'Migration guides and documentation'
      ],
      impact: {
        description: 'Standardized UI/UX across all applications and accelerated development',
        metrics: [
          { label: 'Development Speed', value: '60% faster', description: 'Feature development acceleration' },
          { label: 'Code Reusability', value: '80% components', description: 'Shared across applications' },
          { label: 'Bug Reduction', value: '45% fewer', description: 'UI-related bugs decreased' },
          { label: 'Team Adoption', value: '100% usage', description: 'Across all Angular teams' }
        ]
      },
      category: ProjectCategory.ENTERPRISE,
      status: ProjectStatus.MAINTAINED,
      startDate: '2021-06',
      teamSize: 4,
      role: 'Lead Developer & Design System Architect',
      challenges: [
        'Balancing customization with consistency',
        'Managing breaking changes across dependent applications',
        'Ensuring accessibility compliance',
        'Maintaining performance with growing component library'
      ],
      solutions: [
        'Implemented semantic versioning with clear migration paths',
        'Created automated testing pipeline with visual regression tests',
        'Established accessibility guidelines and automated testing',
        'Applied tree-shaking and lazy loading for optimal performance'
      ]
    },
    {
      id: 'solar-monitoring-platform',
      title: 'Solar Energy Monitoring Platform',
      company: 'Enact Systems',
      description: 'Real-time solar energy monitoring and analytics platform serving 50,000+ installations with white-label capabilities.',
      longDescription: 'A comprehensive solar energy monitoring platform that provides real-time analytics, performance tracking, and predictive maintenance for solar installations. Features white-label capabilities serving multiple solar energy companies worldwide.',
      technologies: ['Angular 12', 'TypeScript', 'D3.js', 'WebSockets', 'Node.js', 'Express', 'MongoDB', 'AWS IoT', 'Redis'],
      features: [
        'Real-time energy production monitoring',
        'Interactive data visualizations with D3.js',
        'Predictive maintenance alerts',
        'White-label multi-tenant architecture',
        'Mobile-responsive dashboard',
        'Historical data analysis and reporting',
        'Weather data integration',
        'Performance benchmarking tools'
      ],
      impact: {
        description: 'Revolutionized solar energy monitoring for companies and end users',
        metrics: [
          { label: 'Installations Monitored', value: '50,000+', description: 'Solar installations worldwide' },
          { label: 'Onboarding Time', value: '67% reduction', description: 'From 15 to 5 minutes' },
          { label: 'Client Companies', value: '10+ served', description: 'White-label deployments' },
          { label: 'Uptime', value: '99.9%', description: 'Platform availability' }
        ]
      },
      category: ProjectCategory.ENTERPRISE,
      status: ProjectStatus.COMPLETED,
      startDate: '2020-01',
      endDate: '2021-03',
      teamSize: 6,
      role: 'Senior Frontend Developer',
      challenges: [
        'Handling real-time data from thousands of devices',
        'Creating responsive visualizations for complex data',
        'Implementing white-label functionality',
        'Optimizing performance with large datasets'
      ],
      solutions: [
        'Implemented WebSocket connections with Redis for real-time updates',
        'Used D3.js with virtual scrolling for large dataset visualizations',
        'Created configurable theming system for white-label deployments',
        'Applied data virtualization and pagination strategies'
      ]
    },
    {
      id: 'cloud-learning-platform',
      title: 'Cloud Learning Platform',
      company: 'Epam Systems',
      description: 'Comprehensive e-learning platform built with Angular Dart, serving 10,000+ active learners with video streaming and analytics.',
      longDescription: 'An innovative e-learning platform built with Angular Dart that provides comprehensive course management, video streaming, and advanced analytics. The platform supports multiple learning formats and tracks detailed user engagement.',
      technologies: ['Angular Dart', 'Dart', 'Firebase', 'Video.js', 'Google Analytics', 'Cloud Storage', 'WebRTC'],
      features: [
        'Video streaming with adaptive bitrate',
        'Interactive course content and quizzes',
        'Progress tracking and analytics',
        'Real-time collaboration tools',
        'Mobile-responsive design',
        'Offline content synchronization',
        'Certificate generation and management',
        'Advanced reporting dashboard'
      ],
      impact: {
        description: 'Enhanced online learning experience with innovative technology',
        metrics: [
          { label: 'Active Learners', value: '10,000+', description: 'Concurrent active users' },
          { label: 'Course Completion', value: '85% rate', description: 'Above industry average' },
          { label: 'Test Coverage', value: '100%', description: 'All modules covered' },
          { label: 'Video Engagement', value: '78% avg', description: 'Average view completion' }
        ]
      },
      category: ProjectCategory.ENTERPRISE,
      status: ProjectStatus.COMPLETED,
      startDate: '2018-06',
      endDate: '2020-01',
      teamSize: 8,
      role: 'Senior Frontend Developer',
      challenges: [
        'Working with Angular Dart (less common technology)',
        'Implementing complex video streaming functionality',
        'Achieving 100% test coverage',
        'Integrating multiple third-party services'
      ],
      solutions: [
        'Developed expertise in Angular Dart and Dart ecosystem',
        'Integrated Video.js with custom controls and analytics',
        'Implemented comprehensive testing strategy with unit and integration tests',
        'Created abstraction layers for third-party service integrations'
      ]
    },
    {
      id: 'blockworks-online',
      title: 'BlockWorks Online Tax Platform',
      company: 'H&R Block',
      description: 'Cloud-native tax preparation platform processing 1M+ returns annually, with desktop application built using Electron JS.',
      longDescription: 'A comprehensive tax preparation platform that migrated from monolithic architecture to cloud-native microservices. Includes both web and desktop applications, processing millions of tax returns with complex business logic and regulatory compliance.',
      technologies: ['Angular 6', 'TypeScript', 'Electron JS', 'Node.js', 'Express', 'MongoDB', 'AWS', 'Docker'],
      features: [
        'Complex tax calculation engine',
        'Cross-platform desktop application',
        'Real-time form validation',
        'Document upload and processing',
        'E-filing integration with IRS',
        'Audit trail and compliance reporting',
        'Multi-user collaboration',
        'Offline functionality for desktop app'
      ],
      impact: {
        description: 'Modernized tax preparation with cloud-native architecture',
        metrics: [
          { label: 'Tax Returns', value: '1M+ annually', description: 'Processed successfully' },
          { label: 'Desktop Users', value: '5,000+ professionals', description: 'Using desktop application' },
          { label: 'Processing Accuracy', value: '99.8%', description: 'Error-free submissions' },
          { label: 'Migration Success', value: '100% uptime', description: 'During monolith migration' }
        ]
      },
      category: ProjectCategory.ENTERPRISE,
      status: ProjectStatus.COMPLETED,
      startDate: '2016-07',
      endDate: '2018-06',
      teamSize: 10,
      role: 'Frontend Developer',
      challenges: [
        'Migrating from monolithic to microservices architecture',
        'Implementing complex tax business logic',
        'Building cross-platform desktop application',
        'Ensuring regulatory compliance and security'
      ],
      solutions: [
        'Implemented gradual migration strategy with API gateways',
        'Created comprehensive test suite for tax calculation logic',
        'Used Electron JS for cross-platform desktop development',
        'Applied security best practices and regular compliance audits'
      ]
    },
    {
      id: 'customer-analytics-platform',
      title: 'Customer Analytics Platform',
      company: 'Flytxt',
      description: 'Real-time customer behavior analytics and segmentation platform analyzing 10M+ interactions daily with Angular 2.',
      longDescription: 'A pioneering customer analytics platform built during Angular 2 beta phase, providing real-time customer behavior analysis and segmentation for mobile marketing campaigns. The platform processes millions of customer interactions daily.',
      technologies: ['Angular 2', 'TypeScript', 'D3.js', 'Java', 'Spring Boot', 'Redis', 'Kafka', 'PostgreSQL'],
      features: [
        'Real-time customer behavior tracking',
        'Advanced segmentation algorithms',
        'Interactive data visualizations',
        'Campaign performance analytics',
        'A/B testing framework',
        'Customer journey mapping',
        'Predictive modeling integration',
        'REST API for third-party integrations'
      ],
      impact: {
        description: 'Enabled data-driven marketing decisions with real-time insights',
        metrics: [
          { label: 'Daily Interactions', value: '10M+', description: 'Customer interactions analyzed' },
          { label: 'Performance Improvement', value: '50% faster', description: 'With caching strategies' },
          { label: 'Campaign Effectiveness', value: '35% increase', description: 'Conversion rates improved' },
          { label: 'Client Satisfaction', value: '92% rating', description: 'Platform usability score' }
        ]
      },
      category: ProjectCategory.ENTERPRISE,
      status: ProjectStatus.COMPLETED,
      startDate: '2015-08',
      endDate: '2016-07',
      teamSize: 6,
      role: 'Frontend Developer',
      challenges: [
        'Working with Angular 2 during beta phase',
        'Processing and visualizing large datasets',
        'Implementing complex analytics algorithms',
        'Ensuring real-time performance at scale'
      ],
      solutions: [
        'Became early adopter and contributed to Angular 2 community',
        'Implemented efficient data virtualization with D3.js',
        'Collaborated with data science team on algorithm implementation',
        'Applied caching strategies and performance optimization techniques'
      ]
    }
  ];

  projects = signal<Project[]>(this.projectsData);
  filteredProjects = signal<Project[]>(this.projectsData);
  currentFilter = signal<ProjectFilter>({});

  getProjects() {
    return this.projects();
  }

  getFilteredProjects() {
    return this.filteredProjects();
  }

  getProjectById(id: string): Project | undefined {
    return this.projects().find(project => project.id === id);
  }

  getFeaturedProjects(limit: number = 6): Project[] {
    return this.projects().slice(0, limit);
  }

  filterProjects(filter: ProjectFilter) {
    this.currentFilter.set(filter);

    const filtered = this.projects().filter(project => {
      if (filter.category && project.category !== filter.category) return false;
      if (filter.status && project.status !== filter.status) return false;
      if (filter.company && !project.company.toLowerCase().includes(filter.company.toLowerCase())) return false;
      if (filter.technology && !project.technologies.some(tech =>
        tech.toLowerCase().includes(filter.technology!.toLowerCase())
      )) return false;

      return true;
    });

    this.filteredProjects.set(filtered);
  }

  clearFilters() {
    this.currentFilter.set({});
    this.filteredProjects.set(this.projects());
  }

  getCurrentFilter() {
    return this.currentFilter();
  }

  getProjectsByCompany(company: string): Project[] {
    return this.projects().filter(project =>
      project.company.toLowerCase().includes(company.toLowerCase())
    );
  }

  getProjectsByTechnology(technology: string): Project[] {
    return this.projects().filter(project =>
      project.technologies.some(tech =>
        tech.toLowerCase().includes(technology.toLowerCase())
      )
    );
  }

  getAllTechnologies(): string[] {
    const allTechnologies = this.projects()
      .flatMap(project => project.technologies);
    return [...new Set(allTechnologies)].sort();
  }

  getAllCompanies(): string[] {
    return [...new Set(this.projects().map(project => project.company))];
  }

  getAllCategories(): ProjectCategory[] {
    return Object.values(ProjectCategory);
  }

  getAllStatuses(): ProjectStatus[] {
    return Object.values(ProjectStatus);
  }
}