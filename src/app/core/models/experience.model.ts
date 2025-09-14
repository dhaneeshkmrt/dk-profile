export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  startDate: string;
  endDate: string;
  location: string;
  companyLogo?: string;
  technologies: string[];
  achievements: string[];
  responsibilities: string[];
  projectHighlights?: ProjectHighlight[];
  isExpanded?: boolean;
}

export interface ProjectHighlight {
  name: string;
  description: string;
  impact: string;
  technologies: string[];
}

export interface ExperienceCategory {
  category: string;
  experiences: Experience[];
}