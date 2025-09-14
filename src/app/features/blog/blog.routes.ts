import { Routes } from '@angular/router';

export const BLOG_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/blog-list/blog-list.component').then(
        (m) => m.BlogListComponent
      ),
    title: 'Technical Blog - Dhaneesh Kumar T',
    data: {
      description: 'Technical insights, tutorials, and experiences from Angular development and software engineering.',
      keywords: ['Angular', 'TypeScript', 'Web Development', 'Technical Blog', 'Software Engineering']
    }
  },
  {
    path: ':slug',
    loadComponent: () =>
      import('./components/blog-post/blog-post.component').then(
        (m) => m.BlogPostComponent
      ),
    title: 'Blog Post - Dhaneesh Kumar T',
    data: {
      description: 'Read the full article with detailed insights and practical examples.',
      keywords: ['Angular', 'TypeScript', 'Tutorial', 'Best Practices']
    }
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];