import { Injectable, signal } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import {
  BlogPost,
  BlogCategory,
  BlogFilter,
  BlogListResponse,
  BlogPagination,
  RelatedPost,
  BlogFrontmatter,
  BlogComment,
  BlogStatistics,
  BLOG_CATEGORIES,
  POPULAR_TAGS,
  DEFAULT_BLOG_CONFIG
} from '../models';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private posts = signal<BlogPost[]>([]);
  private categories = signal<BlogCategory[]>(Object.values(BLOG_CATEGORIES));
  private popularTags = signal<string[]>(POPULAR_TAGS);

  constructor() {
    this.initializeMockData();
  }

  /**
   * Get paginated blog posts with optional filtering
   */
  async getBlogPosts(options: {
    page?: number;
    limit?: number;
    filter?: BlogFilter;
  } = {}): Promise<BlogListResponse> {
    const { page = 1, limit = 12, filter = {} } = options;

    // Simulate API delay
    await this.delay(300);

    let filteredPosts = this.posts();

    // Apply filters
    if (filter.category) {
      filteredPosts = filteredPosts.filter(post =>
        post.category.slug === filter.category
      );
    }

    if (filter.tag) {
      filteredPosts = filteredPosts.filter(post =>
        post.tags.some(tag => tag.toLowerCase().includes(filter.tag!.toLowerCase()))
      );
    }

    if (filter.author) {
      filteredPosts = filteredPosts.filter(post =>
        post.author.name.toLowerCase().includes(filter.author!.toLowerCase())
      );
    }

    if (filter.featured !== undefined) {
      filteredPosts = filteredPosts.filter(post => post.featured === filter.featured);
    }

    if (filter.searchTerm) {
      const searchTerm = filter.searchTerm.toLowerCase();
      filteredPosts = filteredPosts.filter(post =>
        post.title.toLowerCase().includes(searchTerm) ||
        post.excerpt.toLowerCase().includes(searchTerm) ||
        post.content.toLowerCase().includes(searchTerm) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    if (filter.dateFrom || filter.dateTo) {
      filteredPosts = filteredPosts.filter(post => {
        const postDate = post.publishDate;
        const afterStartDate = !filter.dateFrom || postDate >= filter.dateFrom;
        const beforeEndDate = !filter.dateTo || postDate <= filter.dateTo;
        return afterStartDate && beforeEndDate;
      });
    }

    // Sort by publish date (newest first)
    filteredPosts.sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime());

    // Apply pagination
    const total = filteredPosts.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

    const pagination: BlogPagination = {
      page,
      limit,
      total,
      totalPages
    };

    return {
      posts: paginatedPosts,
      pagination,
      categories: this.categories(),
      popularTags: this.popularTags()
    };
  }

  /**
   * Get a single blog post by slug
   */
  async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    await this.delay(200);

    const post = this.posts().find(p => p.slug === slug);
    return post || null;
  }

  /**
   * Get related posts for a given post
   */
  async getRelatedPosts(postId: string, limit: number = 3): Promise<RelatedPost[]> {
    await this.delay(150);

    const currentPost = this.posts().find(p => p.id === postId);
    if (!currentPost) return [];

    // Find posts with similar tags or same category
    const relatedPosts = this.posts()
      .filter(post => post.id !== postId && !post.draft)
      .map(post => {
        let score = 0;

        // Same category gets higher score
        if (post.category.id === currentPost.category.id) {
          score += 10;
        }

        // Shared tags get points
        const sharedTags = post.tags.filter(tag =>
          currentPost.tags.includes(tag)
        );
        score += sharedTags.length * 2;

        return { post, score };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(({ post }) => ({
        id: post.id,
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        coverImage: post.coverImage,
        category: post.category,
        publishDate: post.publishDate,
        readTime: post.readTime
      }));

    return relatedPosts;
  }

  /**
   * Get all categories
   */
  async getCategories(): Promise<BlogCategory[]> {
    await this.delay(100);
    return this.categories();
  }

  /**
   * Get popular tags
   */
  async getPopularTags(): Promise<string[]> {
    await this.delay(100);
    return this.popularTags();
  }

  /**
   * Get featured posts
   */
  async getFeaturedPosts(limit: number = 3): Promise<BlogPost[]> {
    await this.delay(200);

    return this.posts()
      .filter(post => post.featured && !post.draft)
      .sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime())
      .slice(0, limit);
  }

  /**
   * Get recent posts
   */
  async getRecentPosts(limit: number = 5): Promise<BlogPost[]> {
    await this.delay(200);

    return this.posts()
      .filter(post => !post.draft)
      .sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime())
      .slice(0, limit);
  }

  /**
   * Search blog posts
   */
  async searchPosts(query: string): Promise<BlogPost[]> {
    await this.delay(250);

    if (!query.trim()) return [];

    const searchTerm = query.toLowerCase();

    return this.posts()
      .filter(post => !post.draft)
      .filter(post =>
        post.title.toLowerCase().includes(searchTerm) ||
        post.excerpt.toLowerCase().includes(searchTerm) ||
        post.content.toLowerCase().includes(searchTerm) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
        post.category.name.toLowerCase().includes(searchTerm)
      );
  }

  /**
   * Track post view
   */
  async trackPostView(postId: string): Promise<void> {
    await this.delay(100);

    const posts = this.posts();
    const postIndex = posts.findIndex(p => p.id === postId);

    if (postIndex !== -1) {
      const updatedPosts = [...posts];
      updatedPosts[postIndex] = {
        ...updatedPosts[postIndex],
        views: (updatedPosts[postIndex].views || 0) + 1
      };
      this.posts.set(updatedPosts);
    }
  }

  /**
   * Like/unlike a post
   */
  async togglePostLike(postId: string): Promise<boolean> {
    await this.delay(100);

    const posts = this.posts();
    const postIndex = posts.findIndex(p => p.id === postId);

    if (postIndex !== -1) {
      const updatedPosts = [...posts];
      const currentLikes = updatedPosts[postIndex].likes || 0;
      updatedPosts[postIndex] = {
        ...updatedPosts[postIndex],
        likes: currentLikes + 1
      };
      this.posts.set(updatedPosts);
      return true;
    }

    return false;
  }

  /**
   * Get blog statistics
   */
  async getBlogStatistics(): Promise<BlogStatistics> {
    await this.delay(200);

    const posts = this.posts().filter(p => !p.draft);

    const categoriesCount = posts.reduce((acc, post) => {
      acc[post.category.id] = (acc[post.category.id] || 0) + 1;
      return acc;
    }, {} as { [categoryId: string]: number });

    const tagsCount = posts.reduce((acc, post) => {
      post.tags.forEach(tag => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {} as { [tag: string]: number });

    const totalViews = posts.reduce((sum, post) => sum + (post.views || 0), 0);
    const totalLikes = posts.reduce((sum, post) => sum + (post.likes || 0), 0);

    const mostPopularPosts = posts
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, 5);

    const recentPosts = posts
      .sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime())
      .slice(0, 5);

    return {
      totalPosts: posts.length,
      totalViews,
      totalLikes,
      totalComments: 0, // Mock value
      categoriesCount,
      tagsCount,
      mostPopularPosts,
      recentPosts
    };
  }

  /**
   * Parse markdown content with frontmatter
   */
  parseMarkdownWithFrontmatter(markdownContent: string): {
    frontmatter: BlogFrontmatter;
    content: string;
  } {
    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = markdownContent.match(frontmatterRegex);

    if (!match) {
      return {
        frontmatter: {
          title: 'Untitled Post',
          date: new Date().toISOString(),
          category: 'general',
          tags: [],
          excerpt: ''
        },
        content: markdownContent
      };
    }

    const frontmatterYaml = match[1];
    const content = match[2];

    // Simple YAML parser for frontmatter (in production, use a proper YAML parser)
    const frontmatter: BlogFrontmatter = {
      title: 'Untitled Post',
      date: new Date().toISOString(),
      category: 'general',
      tags: [],
      excerpt: ''
    };

    frontmatterYaml.split('\n').forEach(line => {
      const colonIndex = line.indexOf(':');
      if (colonIndex === -1) return;

      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim();

      switch (key) {
        case 'title':
          frontmatter.title = value.replace(/['"]/g, '');
          break;
        case 'date':
          frontmatter.date = value.replace(/['"]/g, '');
          break;
        case 'category':
          frontmatter.category = value.replace(/['"]/g, '');
          break;
        case 'excerpt':
          frontmatter.excerpt = value.replace(/['"]/g, '');
          break;
        case 'tags':
          if (value.startsWith('[') && value.endsWith(']')) {
            frontmatter.tags = value
              .slice(1, -1)
              .split(',')
              .map(tag => tag.trim().replace(/['"]/g, ''));
          }
          break;
        case 'featured':
          frontmatter.featured = value.toLowerCase() === 'true';
          break;
        case 'draft':
          frontmatter.draft = value.toLowerCase() === 'true';
          break;
        case 'readTime':
          frontmatter.readTime = parseInt(value, 10) || undefined;
          break;
        case 'coverImage':
          frontmatter.coverImage = value.replace(/['"]/g, '');
          break;
      }
    });

    return { frontmatter, content };
  }

  /**
   * Convert markdown to HTML (basic implementation)
   */
  markdownToHtml(markdown: string): string {
    // Basic markdown parsing (in production, use a proper markdown parser like marked.js)
    let html = markdown;

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Bold and italic
    html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Code blocks and inline code
    html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // Lists
    html = html.replace(/^\* (.*)$/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

    // Paragraphs
    html = html.replace(/\n\n/g, '</p><p>');
    html = '<p>' + html + '</p>';

    // Clean up empty paragraphs
    html = html.replace(/<p><\/p>/g, '');

    return html;
  }

  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private initializeMockData(): void {
    // Initialize with sample blog posts
    const mockPosts: BlogPost[] = [
      {
        id: '1',
        slug: 'angular-signals-deep-dive',
        title: 'Angular Signals: A Deep Dive into Reactive State Management',
        excerpt: 'Explore the power of Angular Signals and how they revolutionize reactive programming in Angular applications.',
        content: this.markdownToHtml(`
# Angular Signals: A Deep Dive

Angular Signals represent a significant evolution in how we manage reactive state in Angular applications. This comprehensive guide will take you through everything you need to know about Signals.

## What are Angular Signals?

Signals are a reactive primitive that can notify interested consumers when they change. They're designed to be:
- **Simple**: Easy to understand and use
- **Performant**: Efficient change detection
- **Composable**: Work well together

## Basic Usage

\`\`\`typescript
import { signal, computed, effect } from '@angular/core';

// Create a signal
const count = signal(0);

// Create a computed signal
const doubledCount = computed(() => count() * 2);

// Create an effect
effect(() => {
  console.log('Count is:', count());
});
\`\`\`

## Advanced Patterns

### Signal-based Services

\`\`\`typescript
@Injectable()
export class CounterService {
  private _count = signal(0);
  count = this._count.asReadonly();

  increment() {
    this._count.update(current => current + 1);
  }
}
\`\`\`

This is just the beginning of what's possible with Angular Signals!
        `),
        author: {
          name: 'Dhaneesh Kumar T',
          email: 'dhaneeshkmrt@gmail.com',
          avatar: '/assets/images/author-avatar.jpg',
          bio: 'Senior Technical Lead with 11+ years of experience in Angular and web technologies'
        },
        category: BLOG_CATEGORIES.angular,
        tags: ['Angular', 'Signals', 'Reactive Programming', 'State Management'],
        publishDate: new Date('2024-12-15'),
        readTime: 8,
        coverImage: '/assets/images/blog/angular-signals.jpg',
        featured: true,
        draft: false,
        views: 1250,
        likes: 89,
        seoMeta: {
          title: 'Angular Signals: A Deep Dive into Reactive State Management',
          description: 'Learn how Angular Signals revolutionize reactive programming and state management in modern Angular applications.',
          keywords: ['Angular', 'Signals', 'Reactive Programming', 'State Management', 'Web Development'],
          ogImage: '/assets/images/blog/angular-signals-og.jpg'
        }
      }
      // Additional mock posts would go here...
    ];

    this.posts.set(mockPosts);
  }
}