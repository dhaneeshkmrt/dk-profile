export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: BlogAuthor;
  category: BlogCategory;
  tags: string[];
  publishDate: Date;
  updatedDate?: Date;
  readTime: number; // estimated reading time in minutes
  coverImage?: string;
  featured: boolean;
  draft: boolean;
  views?: number;
  likes?: number;
  seoMeta: SeoMeta;
}

export interface BlogAuthor {
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  socialLinks?: SocialLinks;
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  icon?: string;
  order: number;
}

export interface SeoMeta {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonical?: string;
}

export interface BlogFrontmatter {
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
  coverImage?: string;
  readTime?: number;
  author?: string;
  featured?: boolean;
  draft?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
}

export interface BlogFilter {
  category?: string;
  tag?: string;
  author?: string;
  featured?: boolean;
  dateFrom?: Date;
  dateTo?: Date;
  searchTerm?: string;
}

export interface BlogPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface BlogListResponse {
  posts: BlogPost[];
  pagination: BlogPagination;
  categories: BlogCategory[];
  popularTags: string[];
}

export interface RelatedPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage?: string;
  category: BlogCategory;
  publishDate: Date;
  readTime: number;
}

export interface BlogComment {
  id: string;
  postId: string;
  author: {
    name: string;
    avatar?: string;
    website?: string;
  };
  content: string;
  publishDate: Date;
  replies?: BlogComment[];
  approved: boolean;
}

export interface BlogStatistics {
  totalPosts: number;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  categoriesCount: { [categoryId: string]: number };
  tagsCount: { [tag: string]: number };
  mostPopularPosts: BlogPost[];
  recentPosts: BlogPost[];
}

// Search related interfaces
export interface BlogSearchResult {
  post: BlogPost;
  score: number;
  matchedFields: string[];
  highlights: { [field: string]: string };
}

export interface BlogSearchResponse {
  results: BlogSearchResult[];
  totalResults: number;
  searchTime: number;
  suggestions?: string[];
}

// RSS Feed interfaces
export interface RssFeedItem {
  title: string;
  description: string;
  link: string;
  pubDate: Date;
  guid: string;
  author: string;
  category?: string;
}

export interface RssFeed {
  title: string;
  description: string;
  link: string;
  items: RssFeedItem[];
  lastBuildDate: Date;
}