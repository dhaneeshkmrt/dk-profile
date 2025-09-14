import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogPost } from '../../models';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.scss'
})
export class BlogCardComponent {
  @Input({ required: true }) post!: BlogPost;
  @Input() showCategory: boolean = true;
  @Input() showTags: boolean = true;
  @Input() showReadTime: boolean = true;
  @Input() showExcerpt: boolean = true;

  @Output() cardClick = new EventEmitter<BlogPost>();
  @Output() categoryClick = new EventEmitter<string>();
  @Output() tagClick = new EventEmitter<string>();

  onCardClick(event: Event) {
    // Prevent navigation if clicking on tags or category
    if ((event.target as HTMLElement).closest('.tag, .category-link')) {
      return;
    }
    this.cardClick.emit(this.post);
  }

  onCategoryClick(event: Event) {
    event.stopPropagation();
    this.categoryClick.emit(this.post.category.slug);
  }

  onTagClick(event: Event, tag: string) {
    event.stopPropagation();
    this.tagClick.emit(tag);
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  }

  getReadTimeText(minutes: number): string {
    return `${minutes} min read`;
  }

  getDefaultImage(): string {
    return '/assets/images/blog-default.jpg';
  }
}