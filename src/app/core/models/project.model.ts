export interface Project {
  id: string;
  title: string;
  company: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  features: string[];
  impact: ProjectImpact;
  images?: string[];
  demoUrl?: string;
  githubUrl?: string;
  category: ProjectCategory;
  status: ProjectStatus;
  startDate: string;
  endDate?: string;
  teamSize?: number;
  role: string;
  challenges?: string[];
  solutions?: string[];
}

export interface ProjectImpact {
  metrics: ProjectMetric[];
  description: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
  description: string;
}

export enum ProjectCategory {
  ENTERPRISE = 'Enterprise',
  OPENSOURCE = 'Open Source',
  PERSONAL = 'Personal',
  CLIENT = 'Client Work'
}

export enum ProjectStatus {
  COMPLETED = 'Completed',
  ONGOING = 'Ongoing',
  MAINTAINED = 'Maintained',
  ARCHIVED = 'Archived'
}

export interface ProjectFilter {
  category?: ProjectCategory;
  technology?: string;
  company?: string;
  status?: ProjectStatus;
}