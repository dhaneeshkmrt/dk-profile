export interface BlogConfig {
  title: string;
  description: string;
  author: string;
  baseUrl: string;
  postsPerPage: number;
  featuredPostsCount: number;
  recentPostsCount: number;
  relatedPostsCount: number;
  enableComments: boolean;
  enableSearch: boolean;
  enableRss: boolean;
  enableAnalytics: boolean;
  socialSharing: SocialSharingConfig;
  seo: BlogSeoConfig;
}

export interface SocialSharingConfig {
  enabled: boolean;
  platforms: {
    twitter: boolean;
    linkedin: boolean;
    facebook: boolean;
    reddit: boolean;
    hackernews: boolean;
  };
}

export interface BlogSeoConfig {
  siteName: string;
  twitterHandle?: string;
  defaultImage: string;
  enableStructuredData: boolean;
  enableOpenGraph: boolean;
  enableTwitterCards: boolean;
}

export const DEFAULT_BLOG_CONFIG: BlogConfig = {
  title: 'Dhaneesh Kumar T - Technical Blog',
  description: 'Technical insights, best practices, and experiences from a Senior Angular Developer',
  author: 'Dhaneesh Kumar T',
  baseUrl: 'https://dhaneeshkmrt.github.io/dk-profile',
  postsPerPage: 12,
  featuredPostsCount: 3,
  recentPostsCount: 5,
  relatedPostsCount: 3,
  enableComments: true,
  enableSearch: true,
  enableRss: true,
  enableAnalytics: true,
  socialSharing: {
    enabled: true,
    platforms: {
      twitter: true,
      linkedin: true,
      facebook: true,
      reddit: true,
      hackernews: true,
    },
  },
  seo: {
    siteName: 'DK Technical Blog',
    twitterHandle: '@dhaneeshkmrt',
    defaultImage: '/assets/images/blog-default.jpg',
    enableStructuredData: true,
    enableOpenGraph: true,
    enableTwitterCards: true,
  },
};

export const BLOG_CATEGORIES: { [key: string]: BlogCategory } = {
  technical: {
    id: 'technical',
    name: 'Technical Deep Dives',
    slug: 'technical',
    description: 'In-depth technical articles and tutorials',
    color: '#3B82F6',
    icon: '💻',
    order: 1,
  },
  angular: {
    id: 'angular',
    name: 'Angular',
    slug: 'angular',
    description: 'Angular framework insights and best practices',
    color: '#DC2626',
    icon: '⚡',
    order: 2,
  },
  leadership: {
    id: 'leadership',
    name: 'Leadership & Management',
    slug: 'leadership',
    description: 'Leadership insights and team management',
    color: '#7C3AED',
    icon: '👥',
    order: 3,
  },
  practices: {
    id: 'practices',
    name: 'Best Practices',
    slug: 'best-practices',
    description: 'Development best practices and patterns',
    color: '#059669',
    icon: '📋',
    order: 4,
  },
  performance: {
    id: 'performance',
    name: 'Performance Optimization',
    slug: 'performance',
    description: 'Performance optimization techniques',
    color: '#EA580C',
    icon: '🚀',
    order: 5,
  },
  architecture: {
    id: 'architecture',
    name: 'Software Architecture',
    slug: 'architecture',
    description: 'System design and architecture patterns',
    color: '#8B5CF6',
    icon: '🏗️',
    order: 6,
  },
};

import { BlogCategory } from './blog-post.model';

export const POPULAR_TAGS = [
  'Angular',
  'TypeScript',
  'JavaScript',
  'RxJS',
  'NgRx',
  'Signals',
  'Performance',
  'Testing',
  'Architecture',
  'Best Practices',
  'Leadership',
  'Team Management',
  'Code Review',
  'Design Systems',
  'Monorepo',
  'Nx',
  'Web Components',
  'Accessibility',
  'SEO',
  'PWA',
];