import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogCategory } from '../../models';

@Component({
  selector: 'app-blog-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-sidebar.component.html',
  styleUrl: './blog-sidebar.component.scss'
})
export class BlogSidebarComponent {
  @Input() categories: BlogCategory[] = [];
  @Input() popularTags: string[] = [];
  @Input() selectedCategory: string = '';
  @Input() selectedTag: string = '';
  @Input() showFeaturedOnly: boolean = false;
  @Input() hasActiveFilters: boolean = false;

  @Output() categoryFilter = new EventEmitter<string>();
  @Output() tagFilter = new EventEmitter<string>();
  @Output() toggleFeatured = new EventEmitter<void>();
  @Output() clearFilters = new EventEmitter<void>();

  onCategoryClick(categorySlug: string) {
    const newCategory = this.selectedCategory === categorySlug ? '' : categorySlug;
    this.categoryFilter.emit(newCategory);
  }

  onTagClick(tag: string) {
    const newTag = this.selectedTag === tag ? '' : tag;
    this.tagFilter.emit(newTag);
  }

  onFeaturedToggle() {
    this.toggleFeatured.emit();
  }

  onClearAllFilters() {
    this.clearFilters.emit();
  }

  isCategorySelected(categorySlug: string): boolean {
    return this.selectedCategory === categorySlug;
  }

  isTagSelected(tag: string): boolean {
    return this.selectedTag === tag;
  }
}