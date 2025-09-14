import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { BlogPost, BlogFilter, BlogCategory } from '../../models';
import { BlogService } from '../../services/blog.service';
import { BlogCardComponent } from '../blog-card/blog-card.component';
import { BlogSearchComponent } from '../blog-search/blog-search.component';
import { BlogSidebarComponent } from '../blog-sidebar/blog-sidebar.component';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    BlogCardComponent,
    BlogSearchComponent,
    BlogSidebarComponent
  ],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss'
})
export class BlogListComponent implements OnInit {
  private blogService = inject(BlogService);
  private router = inject(Router);

  // State signals
  posts = signal<BlogPost[]>([]);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);
  currentPage = signal<number>(1);
  totalPages = signal<number>(1);
  totalPosts = signal<number>(0);

  // Filter signals
  selectedCategory = signal<string>('');
  selectedTag = signal<string>('');
  searchTerm = signal<string>('');
  showFeaturedOnly = signal<boolean>(false);

  // Available data signals
  categories = signal<BlogCategory[]>([]);
  popularTags = signal<string[]>([]);

  // Computed properties
  filteredPosts = computed(() => {
    let filtered = this.posts();

    if (this.selectedCategory()) {
      filtered = filtered.filter(post =>
        post.category.slug === this.selectedCategory()
      );
    }

    if (this.selectedTag()) {
      filtered = filtered.filter(post =>
        post.tags.includes(this.selectedTag())
      );
    }

    if (this.searchTerm()) {
      const term = this.searchTerm().toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(term) ||
        post.excerpt.toLowerCase().includes(term) ||
        post.content.toLowerCase().includes(term) ||
        post.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }

    if (this.showFeaturedOnly()) {
      filtered = filtered.filter(post => post.featured);
    }

    return filtered;
  });

  hasActiveFilters = computed(() =>
    !!(this.selectedCategory() || this.selectedTag() || this.searchTerm() || this.showFeaturedOnly())
  );

  ngOnInit() {
    this.loadBlogData();
  }

  async loadBlogData() {
    try {
      this.loading.set(true);
      this.error.set(null);

      const [blogData, categoriesData, tagsData] = await Promise.all([
        this.blogService.getBlogPosts({
          page: this.currentPage(),
          limit: 12
        }),
        this.blogService.getCategories(),
        this.blogService.getPopularTags()
      ]);

      this.posts.set(blogData.posts);
      this.totalPages.set(blogData.pagination.totalPages);
      this.totalPosts.set(blogData.pagination.total);
      this.categories.set(categoriesData);
      this.popularTags.set(tagsData);

    } catch (error) {
      console.error('Error loading blog data:', error);
      this.error.set('Failed to load blog posts. Please try again.');
    } finally {
      this.loading.set(false);
    }
  }

  onSearchChange(searchTerm: string) {
    this.searchTerm.set(searchTerm);
  }

  onCategoryFilter(category: string) {
    this.selectedCategory.set(category);
    // Reset pagination when filtering
    this.currentPage.set(1);
  }

  onTagFilter(tag: string) {
    this.selectedTag.set(tag);
    this.currentPage.set(1);
  }

  onToggleFeatured() {
    this.showFeaturedOnly.set(!this.showFeaturedOnly());
    this.currentPage.set(1);
  }

  onClearFilters() {
    this.selectedCategory.set('');
    this.selectedTag.set('');
    this.searchTerm.set('');
    this.showFeaturedOnly.set(false);
    this.currentPage.set(1);
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
      this.loadBlogData();
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  onPostClick(post: BlogPost) {
    this.router.navigate(['/blog', post.slug]);
  }

  trackByPostId(index: number, post: BlogPost): string {
    return post.id;
  }
}