# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Development
```bash
# Start development server at http://localhost:4200
npm start

# Start with specific port (kill 4200 process first if needed)
npx kill-port 4200
npm start

# Build for production
npm run build

# Watch mode for continuous building
npm run watch
```

### Testing
```bash
# Unit tests with Karma
npm test

# E2E tests with Playwright
npm run e2e                  # Run all tests
npm run e2e:ui              # Interactive UI mode
npm run e2e:debug           # Debug mode
npm run e2e:report          # View test report
npx playwright test e2e/tests/app.spec.ts  # Run specific test file

# Validate before commit (from DEVELOPMENT_WORKFLOW.md)
npm run build               # Check for compilation errors
npm run e2e                # Ensure all E2E tests pass
```

### Component Generation
```bash
# Generate standalone component with SCSS styling
ng generate component features/home/components/hero --standalone --style=scss
ng g c shared/components/navbar --standalone --style=scss
```

## Project Architecture

### Technology Stack
- **Framework**: Angular 20 with standalone components
- **Styling**: Tailwind CSS + SCSS + Angular Material (to be added)
- **Testing**: Karma (unit) + Playwright (E2E)
- **State Management**: Services with Signals
- **Deployment Target**: GitHub Pages

### Key Architectural Patterns

1. **Feature-Based Module Structure**: Each feature (home, about, blog, etc.) has its own folder with components, services, models, and routes
2. **Standalone Components**: All components use Angular's standalone API
3. **Shared Components**: Reusable UI components in `src/app/shared/components/`
4. **Design System Components**: Custom dk-* prefixed components (dk-button, dk-card, dk-progress-bar)
5. **Theme Service**: Centralized dark/light theme management via `ThemeService`

### Important Services
- `src/app/core/services/theme.service.ts`: Dark/light theme management with localStorage persistence

### Tailwind Configuration
- Dark mode: Class-based (`darkMode: 'class'`)
- Custom theme extensions in `tailwind.config.js`
- Glass morphism effects configured
- Custom animations: fade-in, slide-up, scale-in, shimmer, blink

## Development Workflow Requirements

Per user instructions and DEVELOPMENT_WORKFLOW.md:
1. **ALWAYS validate functionality before commit**: Build and run E2E tests
2. **Commit after each feature**: Use conventional commit messages
3. **Push to origin**: After validation, push to remote repository

### Commit Process
```bash
# 1. Validate
npm run build
npm run e2e

# 2. Commit with descriptive message
git add .
git commit -m "feat: implement hero section with typing animation"

# 3. Push to remote
git push origin main
```

## Project Context

### Portfolio Website for Dhaneesh Kumar T
- Senior Technical Lead with 11+ years experience
- Angular specialist (versions 4-19)
- Leadership in Angular Community of Practice (India)

### Planned Features
1. **Hero Section**: Animated typing effect, parallax background
2. **About Section**: Achievement counters, tech stack visualization
3. **Experience Timeline**: Interactive career progression
4. **Technical Expertise**: Categorized skill showcase
5. **Project Showcase**: Featured projects with metrics
6. **Blog System**: Markdown-based with search and comments
7. **Leadership & Impact**: Community contributions
8. **Contact Section**: Form, calendar integration, resume download

## 📱 Key Sections & Features

### 1. Hero Section
- Professional header with name and title
- Animated typing effect: "Senior Technical Lead | Angular Expert | 11+ Years"
- Quick contact buttons and social links (GitHub, LinkedIn)
- Latest blog post highlight
- Smooth parallax background effect

### 2. About Section
- Professional summary highlighting leadership & technical expertise
- Key achievements counter animation:
  - 25+ repositories managed
  - 75% bundle size reduction
  - 11+ years experience
  - 7+ years Angular expertise
- Tech stack visualization with skill progress bars

### 3. Experience Timeline
- Interactive timeline component showing career progression
- Expandable cards for each role with key achievements
- Companies: BNP Paribas, Enact Systems, Epam Systems, H&R Block, Flytxt, Finastra
- Filter by technology/company
- Highlight leadership roles and technical achievements

### 4. Technical Expertise
- Categorized skill showcase:
  - **Frontend**: Angular (4-19), TypeScript, RxJS, NgRx, Signals, HTML5, CSS3, SCSS, Tailwind
  - **Backend**: Node.js, Express, Python, FastAPI, TypeORM, TypeDI
  - **Databases**: PostgreSQL, MongoDB
  - **DevOps**: AWS, GCP, Heroku, Firebase, PM2
  - **Tools**: Nx Monorepo, Git, GitHub/GitLab/Bitbucket, Jasmine, Karma, Playwright
  - **Others**: Flutter, Electron JS, Angular Material, Angular Dart
- Interactive skill cards with proficiency levels
- Years of experience indicators

### 5. Project Showcase
Featured projects with metrics:
- **MyCreditApp (BNP Paribas)**
  - 25+ repositories architecture
  - Custom Design System Library
  - Nx monorepo management
- **Solar Monitoring Platform (Enact Systems)**
  - Reduced onboarding time from 15 to 5 minutes
  - 75% bundle size reduction
  - White-label functionality
- **Cloud Learning (Epam Systems)**
  - Angular Dart implementation
  - 100% test coverage
  - Google Analytics integration
- **BlockWorks Online (H&R Block)**
  - Monolithic to cloud-native migration
  - Electron JS desktop application

### 6. Blog Section 📝
- **Blog listing page** with search and filtering
- **Categories**: 
  - Technical Deep Dives
  - Leadership & Management
  - Best Practices
  - Angular Tutorials
  - Design Systems
  - Performance Optimization
- **Features**:
  - Tags system for easy navigation
  - Reading time estimation
  - Share buttons for social media
  - Comments using Giscus (GitHub Discussions)
  - RSS feed generation
  - Related posts suggestions
  - Syntax highlighting for code snippets
  - Search functionality with Lunr.js

### 7. Leadership & Impact
- Angular Community of Practice (India) founder and leader
- Mentoring and team building achievements
- Design System governance at BNP Paribas
- Interview and hiring experience
- Code review and best practices advocacy

### 8. Contact Section
- Professional contact form (using Formspree/EmailJS)
- Calendar integration for scheduling calls (Calendly)
- Resume download button (PDF)
- Social media links
- Email: dhaneeshkmrt@gmail.com
- Phone: +91-81224-74326
- Location: Bangalore, India

## 📝 Blog Management System

### Blog Structure
```
blog-posts/
├── 2025/
│   ├── 01-angular-signals-deep-dive.md
│   ├── 02-nx-monorepo-best-practices.md
│   ├── 03-design-system-governance.md
│   ├── 04-performance-optimization-techniques.md
│   └── 05-angular-migration-strategies.md
├── drafts/
└── assets/
    └── images/
```

### Blog Post Format (Markdown with Frontmatter)
```markdown
---
title: "Building Enterprise Design Systems with Angular"
date: 2025-01-15
category: "Technical"
tags: ["Angular", "Design Systems", "Enterprise", "BNP Paribas"]
excerpt: "Lessons learned from building and governing design systems at scale"
coverImage: "/assets/blog/design-system.jpg"
readTime: 8
author: "Dhaneesh Kumar T"
---

# Content here...
```

### Initial Blog Topics
0. "Clean Code in angular"
1. "Building Angular Design Systems at Scale: 25+ Repositories"
2. "Leading Angular Communities of Practice in Enterprise"
3. "NgRx vs Signals: Choosing the Right State Management"
4. "Nx Monorepo Best Practices for Enterprise Applications"
7. "Angular Version Migration Strategies: v10 to v19"
8. "Implementing White-Label Solutions in Angular"
9. "Design System Governance: Extending Angular Material"
10. "From Developer to Technical Lead: Leadership Journey"

## 🎨 Design Features

### Visual Design
- **Dark/Light theme toggle** with system preference detection
- **Glassmorphism effects** for modern appeal
- **Micro-interactions** on hover and scroll
- **Smooth animations** using Angular Animations API
- **Responsive design** with mobile-first approach
- **Custom scrollbar** styling
- **Loading skeletons** for better UX

### Performance Features
- **Lazy loading** for routes and images
- **Code splitting** for optimal bundle sizes
- **Preloading strategies** for critical resources
- **Service Worker** for offline capabilities
- **Image optimization** with WebP format
- **Font optimization** with font-display: swap

### SEO & Accessibility
- **Meta tags** for all pages
- **Structured data** (JSON-LD) for better search results
- **Sitemap generation** automatic
- **Open Graph tags** for social sharing
- **Twitter Card** support
- **ARIA labels** and semantic HTML
- **Keyboard navigation** support
- **Screen reader** optimized

## 🚀 GitHub Pages Deployment Setup

### Deployment Configuration
1. **Install angular-cli-ghpages**: 
   ```bash
   ng add angular-cli-ghpages
   ```

2. **Configure Scully** for static site generation:
   ```bash
   ng add @scullyio/init
   ```

3. **Package.json scripts**:
   ```json
   {
     "scripts": {
       "build:prod": "ng build --configuration production",
       "scully": "npx scully --scanRoutes",
       "scully:serve": "npx scully serve",
       "deploy": "npm run build:prod && npm run scully && npx angular-cli-ghpages --dir=dist/static"
     }
   }
   ```

4. **GitHub Actions Workflow** (.github/workflows/deploy.yml):
   ```yaml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [main]
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
         - run: npm ci
         - run: npm run build:prod
         - run: npm run scully
         - run: npm run deploy
   ```

5. **Custom domain** (optional): Add CNAME file

## 🛠 Technical Implementation

### Core Technologies
- **Framework**: Angular 20 with standalone components
- **Static Site Generation**: Scully
- **Styling**: Tailwind CSS + Angular Material + Custom SCSS
- **State Management**: Signals (lightweight for static site)
- **Markdown Processing**: ngx-markdown with custom renderers
- **Blog Search**: Lunr.js for client-side search
- **Form Handling**: Formspree or EmailJS
- **Comments**: Giscus (GitHub Discussions based)
- **Analytics**: Google Analytics 4
- **Testing**: Jest + Karma + Playwright

### Performance Targets
- **Lighthouse Score**: 95+ for all metrics
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Bundle Size**: < 200KB initial
- **SEO Score**: 100

## 📦 Complete File Structure (Feature-Based Architecture)

```
dk-profile/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── services/
│   │   │   │   ├── theme.service.ts
│   │   │   │   ├── analytics.service.ts
│   │   │   │   ├── seo.service.ts
│   │   │   │   └── storage.service.ts
│   │   │   ├── guards/
│   │   │   ├── interceptors/
│   │   │   ├── models/
│   │   │   │   └── app-config.model.ts
│   │   │   └── core.module.ts
│   │   ├── shared/
│   │   │   ├── components/
│   │   │   │   ├── navbar/
│   │   │   │   │   ├── navbar.component.ts
│   │   │   │   │   ├── navbar.component.html
│   │   │   │   │   └── navbar.component.scss
│   │   │   │   ├── footer/
│   │   │   │   │   └── footer.component.ts
│   │   │   │   ├── theme-toggle/
│   │   │   │   │   └── theme-toggle.component.ts
│   │   │   │   ├── loading-spinner/
│   │   │   │   ├── skill-bar/
│   │   │   │   └── social-links/
│   │   │   ├── directives/
│   │   │   │   ├── animate-on-scroll.directive.ts
│   │   │   │   └── parallax.directive.ts
│   │   │   ├── pipes/
│   │   │   │   ├── reading-time.pipe.ts
│   │   │   │   └── truncate.pipe.ts
│   │   │   ├── models/
│   │   │   │   └── common.models.ts
│   │   │   └── shared.module.ts
│   │   ├── features/
│   │   │   ├── home/
│   │   │   │   ├── components/
│   │   │   │   │   ├── hero/
│   │   │   │   │   │   ├── hero.component.ts
│   │   │   │   │   │   ├── hero.component.html
│   │   │   │   │   │   └── hero.component.scss
│   │   │   │   │   └── quick-intro/
│   │   │   │   │       └── quick-intro.component.ts
│   │   │   │   ├── home.component.ts
│   │   │   │   ├── home.component.html
│   │   │   │   ├── home.component.scss
│   │   │   │   └── home.routes.ts
│   │   │   ├── about/
│   │   │   │   ├── components/
│   │   │   │   │   ├── about-summary/
│   │   │   │   │   ├── achievement-counter/
│   │   │   │   │   └── tech-stack/
│   │   │   │   ├── services/
│   │   │   │   │   └── about.service.ts
│   │   │   │   ├── models/
│   │   │   │   │   └── about.model.ts
│   │   │   │   ├── about.component.ts
│   │   │   │   └── about.routes.ts
│   │   │   ├── experience/
│   │   │   │   ├── components/
│   │   │   │   │   ├── experience-timeline/
│   │   │   │   │   ├── experience-card/
│   │   │   │   │   └── company-filter/
│   │   │   │   ├── services/
│   │   │   │   │   └── experience.service.ts
│   │   │   │   ├── models/
│   │   │   │   │   └── experience.model.ts
│   │   │   │   ├── data/
│   │   │   │   │   └── experience-data.json
│   │   │   │   ├── experience.component.ts
│   │   │   │   └── experience.routes.ts
│   │   │   ├── skills/
│   │   │   │   ├── components/
│   │   │   │   │   ├── skill-category/
│   │   │   │   │   ├── skill-card/
│   │   │   │   │   └── skill-chart/
│   │   │   │   ├── services/
│   │   │   │   │   └── skills.service.ts
│   │   │   │   ├── models/
│   │   │   │   │   └── skill.model.ts
│   │   │   │   ├── data/
│   │   │   │   │   └── skills-data.json
│   │   │   │   ├── skills.component.ts
│   │   │   │   └── skills.routes.ts
│   │   │   ├── projects/
│   │   │   │   ├── components/
│   │   │   │   │   ├── project-list/
│   │   │   │   │   ├── project-card/
│   │   │   │   │   ├── project-detail/
│   │   │   │   │   └── project-filter/
│   │   │   │   ├── services/
│   │   │   │   │   └── projects.service.ts
│   │   │   │   ├── models/
│   │   │   │   │   └── project.model.ts
│   │   │   │   ├── data/
│   │   │   │   │   └── projects-data.json
│   │   │   │   ├── projects.component.ts
│   │   │   │   └── projects.routes.ts
│   │   │   ├── blog/
│   │   │   │   ├── components/
│   │   │   │   │   ├── blog-list/
│   │   │   │   │   │   ├── blog-list.component.ts
│   │   │   │   │   │   └── blog-list.component.html
│   │   │   │   │   ├── blog-post/
│   │   │   │   │   │   ├── blog-post.component.ts
│   │   │   │   │   │   └── blog-post.component.html
│   │   │   │   │   ├── blog-card/
│   │   │   │   │   ├── blog-sidebar/
│   │   │   │   │   ├── blog-search/
│   │   │   │   │   ├── blog-comments/
│   │   │   │   │   └── related-posts/
│   │   │   │   ├── services/
│   │   │   │   │   ├── blog.service.ts
│   │   │   │   │   ├── markdown.service.ts
│   │   │   │   │   └── search.service.ts
│   │   │   │   ├── models/
│   │   │   │   │   ├── blog-post.model.ts
│   │   │   │   │   └── blog-category.model.ts
│   │   │   │   ├── guards/
│   │   │   │   │   └── blog-post.guard.ts
│   │   │   │   ├── blog.component.ts
│   │   │   │   ├── blog.component.html
│   │   │   │   └── blog.routes.ts
│   │   │   ├── leadership/
│   │   │   │   ├── components/
│   │   │   │   │   ├── community-practice/
│   │   │   │   │   ├── mentoring/
│   │   │   │   │   └── achievements/
│   │   │   │   ├── services/
│   │   │   │   │   └── leadership.service.ts
│   │   │   │   ├── models/
│   │   │   │   │   └── leadership.model.ts
│   │   │   │   ├── leadership.component.ts
│   │   │   │   └── leadership.routes.ts
│   │   │   └── contact/
│   │   │       ├── components/
│   │   │       │   ├── contact-form/
│   │   │       │   ├── contact-info/
│   │   │       │   └── calendar-booking/
│   │   │       ├── services/
│   │   │       │   └── contact.service.ts
│   │   │       ├── models/
│   │   │       │   └── contact.model.ts
│   │   │       ├── contact.component.ts
│   │   │       └── contact.routes.ts
│   │   ├── layouts/
│   │   │   ├── main-layout/
│   │   │   │   ├── main-layout.component.ts
│   │   │   │   └── main-layout.component.html
│   │   │   └── blog-layout/
│   │   │       ├── blog-layout.component.ts
│   │   │       └── blog-layout.component.html
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.routes.ts
│   │   └── app.config.ts
│   ├── assets/
│   │   ├── blog-posts/
│   │   ├── images/
│   │   │   ├── profile/
│   │   │   ├── companies/
│   │   │   └── projects/
│   │   ├── icons/
│   │   └── resume/
│   │       └── dhaneesh-kumar-resume.pdf
│   ├── styles/
│   │   ├── styles.scss
│   │   ├── _variables.scss
│   │   ├── _mixins.scss
│   │   └── _animations.scss
│   └── index.html
├── scully.dk-profile.config.ts
├── blog/
│   └── posts/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── angular.json
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── .gitignore
├── README.md
└── CLAUDE.md (this file)
```

## 📋 Implementation Steps

### Phase 1: Project Setup (Day 1)
1. Initialize Angular project with routing and SCSS
2. Install and configure Tailwind CSS
3. Set up Angular Material
4. Configure Scully for static site generation
5. Set up GitHub repository

### Phase 2: Core Components (Day 2-3)
1. Create layout components (navbar, footer)
2. Implement hero section with animations
3. Build about section with skills
4. Create experience timeline
5. Implement theme toggle

### Phase 3: Advanced Features (Day 4-5)
1. Build projects showcase
2. Create leadership section
3. Implement contact form
4. Add animations and micro-interactions

### Phase 4: Blog System (Day 6-7)
1. Set up ngx-markdown
2. Create blog listing and post components
3. Implement blog search with Lunr.js
4. Set up Giscus for comments
5. Create initial blog posts

### Phase 5: Optimization & Deployment (Day 8)
1. Performance optimization
2. SEO implementation
3. Configure GitHub Pages deployment
4. Set up GitHub Actions
5. Deploy and test

## 🔄 Future Enhancements
- Add testimonials section
- Implement newsletter subscription
- Create interactive code playground
- Add achievement badges
- Implement advanced blog features (series, bookmarks)
- Add multilingual support
- Create PDF resume generator from data
- Add speaking engagements section
- Implement advanced analytics dashboard

## 📌 Important Notes
- Keep all sensitive information in environment variables
- Regularly update blog content to maintain relevance
- Monitor analytics to understand visitor behavior
- Keep dependencies updated for security
- Maintain high performance scores
- Ensure accessibility standards are met
- Regular backups of blog content

## 🚦 Success Metrics
- Lighthouse score > 95
- Page load time < 3 seconds
- SEO score = 100
- Mobile responsive on all devices
- Blog engagement metrics
- Contact form submissions
- GitHub stars on portfolio repo

---

Last Updated: 2025-01-15
Project Status: Planning Phase
GitHub URL: https://github.com/[username]/dk-profile
Live URL: https://[username].github.io/dk-profile/
- /mcp