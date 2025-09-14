import { Component, OnInit, OnDestroy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';

import { BlogPost, RelatedPost } from '../../models';
import { BlogService } from '../../services/blog.service';
import { BlogCardComponent } from '../blog-card/blog-card.component';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule, RouterModule, BlogCardComponent],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.scss'
})
export class BlogPostComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private blogService = inject(BlogService);
  private destroy$ = new Subject<void>();

  // State signals
  post = signal<BlogPost | null>(null);
  relatedPosts = signal<RelatedPost[]>([]);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  // Computed properties
  postTitle = computed(() => this.post()?.title || 'Blog Post');
  postMeta = computed(() => {
    const p = this.post();
    if (!p) return null;

    return {
      author: p.author.name,
      publishDate: this.formatDate(p.publishDate),
      readTime: `${p.readTime} min read`,
      category: p.category.name,
      categoryColor: p.category.color,
      categoryIcon: p.category.icon
    };
  });

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap(params => {
          const slug = params.get('slug');
          if (!slug) {
            throw new Error('No post slug provided');
          }

          this.loading.set(true);
          this.error.set(null);

          return this.blogService.getBlogPostBySlug(slug);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: async (post) => {
          if (!post) {
            this.error.set('Blog post not found');
            return;
          }

          this.post.set(post);

          // Load related posts
          try {
            const related = await this.blogService.getRelatedPosts(post.id, 3);
            this.relatedPosts.set(related);
          } catch (err) {
            console.warn('Failed to load related posts:', err);
          }

          this.loading.set(false);

          // Update page title and meta
          this.updatePageMeta(post);

          // Track page view
          this.trackPageView(post);
        },
        error: (error) => {
          console.error('Error loading blog post:', error);
          this.error.set('Failed to load blog post. Please try again.');
          this.loading.set(false);
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updatePageMeta(post: BlogPost) {
    // Update document title
    document.title = `${post.seoMeta.title} | DK Technical Blog`;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', post.seoMeta.description);
    }

    // Update Open Graph tags
    this.updateOpenGraphTags(post);
  }

  private updateOpenGraphTags(post: BlogPost) {
    const ogTags = [
      { property: 'og:title', content: post.seoMeta.title },
      { property: 'og:description', content: post.seoMeta.description },
      { property: 'og:type', content: 'article' },
      { property: 'og:url', content: window.location.href },
      { property: 'og:image', content: post.seoMeta.ogImage || post.coverImage || '/assets/images/blog-default.jpg' },
      { property: 'article:author', content: post.author.name },
      { property: 'article:published_time', content: post.publishDate.toISOString() },
      { property: 'article:section', content: post.category.name },
      ...post.tags.map(tag => ({ property: 'article:tag', content: tag }))
    ];

    ogTags.forEach(({ property, content }) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    });
  }

  private async trackPageView(post: BlogPost) {
    try {
      await this.blogService.trackPostView(post.id);
    } catch (error) {
      console.warn('Failed to track page view:', error);
    }
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  }

  onTagClick(tag: string) {
    this.router.navigate(['/blog'], {
      queryParams: { tag }
    });
  }

  onCategoryClick(categorySlug: string) {
    this.router.navigate(['/blog'], {
      queryParams: { category: categorySlug }
    });
  }

  onRelatedPostClick(relatedPost: RelatedPost) {
    this.router.navigate(['/blog', relatedPost.slug]);
  }

  onSharePost(platform: 'twitter' | 'linkedin' | 'facebook') {
    const post = this.post();
    if (!post) return;

    const url = window.location.href;
    const text = `Check out this article: ${post.title}`;

    let shareUrl = '';

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
    }

    window.open(shareUrl, '_blank', 'width=600,height=400');
  }

  onBackToBlog() {
    this.router.navigate(['/blog']);
  }
}