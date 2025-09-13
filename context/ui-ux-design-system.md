# UI/UX Design System - DK Portfolio Website

## Overview
This document defines the comprehensive UI/UX design system for Dhaneesh Kumar T's portfolio website. The design emphasizes modern aesthetics, professional presentation, and exceptional user experience to attract HR managers and technical leaders.

## 🎨 Visual Design Language

### Brand Identity
- **Professional, Modern, Technical Excellence**
- **Clean, Minimalist with Strategic Visual Impact** 
- **Trust, Expertise, Innovation**

### Color Palette

#### Primary Colors
```scss
$primary-blue: #2563eb;      // Professional blue
$primary-dark: #1e40af;      // Darker blue for hover states
$accent-cyan: #06b6d4;       // Tech accent color
$accent-emerald: #10b981;    // Success/achievement color
```

#### Neutral Colors
```scss
// Light Theme
$light-bg: #ffffff;
$light-surface: #f8fafc;
$light-surface-alt: #f1f5f9;
$light-border: #e2e8f0;
$light-text-primary: #0f172a;
$light-text-secondary: #475569;
$light-text-muted: #64748b;

// Dark Theme
$dark-bg: #0f172a;
$dark-surface: #1e293b;
$dark-surface-alt: #334155;
$dark-border: #475569;
$dark-text-primary: #f8fafc;
$dark-text-secondary: #cbd5e1;
$dark-text-muted: #94a3b8;
```

#### Semantic Colors
```scss
$success: #10b981;
$warning: #f59e0b;
$error: #ef4444;
$info: #3b82f6;
```

### Typography

#### Font Stack
```scss
// Primary Font (Headings & UI)
$font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

// Secondary Font (Body Text)
$font-secondary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

// Monospace Font (Code)
$font-mono: 'JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', monospace;
```

#### Typography Scale
```scss
// Font Sizes
$text-xs: 0.75rem;    // 12px
$text-sm: 0.875rem;   // 14px
$text-base: 1rem;     // 16px
$text-lg: 1.125rem;   // 18px
$text-xl: 1.25rem;    // 20px
$text-2xl: 1.5rem;    // 24px
$text-3xl: 1.875rem;  // 30px
$text-4xl: 2.25rem;   // 36px
$text-5xl: 3rem;      // 48px
$text-6xl: 3.75rem;   // 60px

// Font Weights
$font-light: 300;
$font-normal: 400;
$font-medium: 500;
$font-semibold: 600;
$font-bold: 700;
$font-extrabold: 800;

// Line Heights
$leading-tight: 1.25;
$leading-normal: 1.5;
$leading-relaxed: 1.625;
```

### Spacing System
```scss
// Spacing Scale (based on 8px grid)
$space-1: 0.25rem;   // 4px
$space-2: 0.5rem;    // 8px
$space-3: 0.75rem;   // 12px
$space-4: 1rem;      // 16px
$space-5: 1.25rem;   // 20px
$space-6: 1.5rem;    // 24px
$space-8: 2rem;      // 32px
$space-10: 2.5rem;   // 40px
$space-12: 3rem;     // 48px
$space-16: 4rem;     // 64px
$space-20: 5rem;     // 80px
$space-24: 6rem;     // 96px
$space-32: 8rem;     // 128px
```

### Border Radius
```scss
$radius-sm: 0.125rem;   // 2px
$radius: 0.25rem;       // 4px
$radius-md: 0.375rem;   // 6px
$radius-lg: 0.5rem;     // 8px
$radius-xl: 0.75rem;    // 12px
$radius-2xl: 1rem;      // 16px
$radius-full: 9999px;   // Full circle
```

### Shadows & Effects
```scss
// Box Shadows
$shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
$shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
$shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
$shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
$shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);

// Glassmorphism Effect
$glass-bg: rgba(255, 255, 255, 0.1);
$glass-border: rgba(255, 255, 255, 0.2);
$glass-backdrop: blur(10px);
```

## 🏗️ Layout System

### Grid System
```scss
// Container Sizes
$container-sm: 640px;
$container-md: 768px;
$container-lg: 1024px;
$container-xl: 1280px;
$container-2xl: 1536px;

// Grid Columns
$grid-cols: 12;
$grid-gap: 1.5rem; // 24px
```

### Breakpoints
```scss
$breakpoint-sm: 640px;
$breakpoint-md: 768px;
$breakpoint-lg: 1024px;
$breakpoint-xl: 1280px;
$breakpoint-2xl: 1536px;
```

## 🧱 Component Design Specifications

### Navigation Bar
```scss
.navbar {
  height: 4rem; // 64px
  background: $glass-bg;
  backdrop-filter: $glass-backdrop;
  border-bottom: 1px solid $glass-border;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 50;
  
  .nav-link {
    font-weight: $font-medium;
    font-size: $text-sm;
    padding: $space-2 $space-4;
    border-radius: $radius-md;
    transition: all 0.2s ease;
    
    &:hover {
      background: rgba(37, 99, 235, 0.1);
      color: $primary-blue;
    }
    
    &.active {
      background: $primary-blue;
      color: white;
    }
  }
}
```

### Hero Section
```scss
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, $primary-blue 0%, $accent-cyan 100%);
  position: relative;
  overflow: hidden;
  
  .hero-content {
    max-width: $container-lg;
    margin: 0 auto;
    padding: $space-8;
    text-align: center;
    color: white;
  }
  
  .hero-title {
    font-size: $text-5xl;
    font-weight: $font-bold;
    line-height: $leading-tight;
    margin-bottom: $space-6;
    
    @media (max-width: $breakpoint-md) {
      font-size: $text-4xl;
    }
  }
  
  .hero-subtitle {
    font-size: $text-xl;
    font-weight: $font-medium;
    opacity: 0.9;
    margin-bottom: $space-8;
  }
  
  .typing-effect {
    border-right: 2px solid white;
    animation: blink 1s infinite;
  }
}

@keyframes blink {
  0%, 50% { border-color: transparent; }
  51%, 100% { border-color: white; }
}
```

### Cards & Containers
```scss
.card {
  background: $light-surface;
  border: 1px solid $light-border;
  border-radius: $radius-xl;
  padding: $space-6;
  box-shadow: $shadow;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: $shadow-lg;
    transform: translateY(-2px);
  }
  
  .dark & {
    background: $dark-surface;
    border-color: $dark-border;
  }
}

.card-glass {
  background: $glass-bg;
  border: 1px solid $glass-border;
  backdrop-filter: $glass-backdrop;
  border-radius: $radius-xl;
  padding: $space-6;
}
```

### Buttons
```scss
.btn {
  display: inline-flex;
  align-items: center;
  gap: $space-2;
  padding: $space-3 $space-6;
  border-radius: $radius-lg;
  font-weight: $font-medium;
  font-size: $text-sm;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
  text-decoration: none;
  
  &.btn-primary {
    background: $primary-blue;
    color: white;
    
    &:hover {
      background: $primary-dark;
      transform: translateY(-1px);
      box-shadow: $shadow-md;
    }
  }
  
  &.btn-secondary {
    background: transparent;
    color: $primary-blue;
    border: 1px solid $primary-blue;
    
    &:hover {
      background: $primary-blue;
      color: white;
    }
  }
  
  &.btn-ghost {
    background: transparent;
    color: $light-text-secondary;
    
    &:hover {
      background: $light-surface-alt;
      color: $light-text-primary;
    }
    
    .dark & {
      color: $dark-text-secondary;
      
      &:hover {
        background: $dark-surface-alt;
        color: $dark-text-primary;
      }
    }
  }
}
```

### Form Elements
```scss
.form-input {
  width: 100%;
  padding: $space-3 $space-4;
  border: 1px solid $light-border;
  border-radius: $radius-lg;
  font-size: $text-base;
  background: $light-bg;
  color: $light-text-primary;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: $primary-blue;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
  
  .dark & {
    background: $dark-surface;
    border-color: $dark-border;
    color: $dark-text-primary;
    
    &:focus {
      border-color: $primary-blue;
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
    }
  }
}
```

### Progress Bars
```scss
.progress-bar {
  width: 100%;
  height: 8px;
  background: $light-surface-alt;
  border-radius: $radius-full;
  overflow: hidden;
  
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, $primary-blue, $accent-cyan);
    border-radius: $radius-full;
    transition: width 0.8s ease;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.3),
        transparent
      );
      animation: shimmer 2s infinite;
    }
  }
  
  .dark & {
    background: $dark-surface-alt;
  }
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
```

## 🎭 Animation System

### Transition Durations
```scss
$duration-fast: 0.15s;
$duration-normal: 0.3s;
$duration-slow: 0.5s;
$duration-slower: 0.75s;
```

### Easing Functions
```scss
$ease-in: cubic-bezier(0.4, 0, 1, 1);
$ease-out: cubic-bezier(0, 0, 0.2, 1);
$ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
$ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Animation Classes
```scss
.fade-in {
  opacity: 0;
  animation: fadeIn 0.6s ease-out forwards;
}

.slide-up {
  transform: translateY(30px);
  opacity: 0;
  animation: slideUp 0.6s ease-out forwards;
}

.scale-in {
  transform: scale(0.9);
  opacity: 0;
  animation: scaleIn 0.4s ease-out forwards;
}

@keyframes fadeIn {
  to { opacity: 1; }
}

@keyframes slideUp {
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes scaleIn {
  to {
    transform: scale(1);
    opacity: 1;
  }
}
```

## 📱 Responsive Design Guidelines

### Mobile-First Approach
- Design for mobile first (320px+)
- Progressive enhancement for larger screens
- Touch-friendly interactive elements (minimum 44px)
- Readable typography on small screens

### Breakpoint Usage
```scss
// Mobile First Media Queries
@mixin mobile-up {
  @media (min-width: $breakpoint-sm) { @content; }
}

@mixin tablet-up {
  @media (min-width: $breakpoint-md) { @content; }
}

@mixin desktop-up {
  @media (min-width: $breakpoint-lg) { @content; }
}

@mixin large-desktop-up {
  @media (min-width: $breakpoint-xl) { @content; }
}
```

### Responsive Typography
```scss
.responsive-text {
  font-size: clamp(1rem, 4vw, 2rem);
}

.hero-title {
  font-size: clamp(2rem, 8vw, 4rem);
}
```

## 🌙 Dark Mode Implementation

### Theme Toggle
```scss
.theme-toggle {
  width: 60px;
  height: 30px;
  background: $light-border;
  border-radius: $radius-full;
  position: relative;
  cursor: pointer;
  transition: background 0.3s ease;
  
  .toggle-thumb {
    width: 26px;
    height: 26px;
    background: white;
    border-radius: $radius-full;
    position: absolute;
    top: 2px;
    left: 2px;
    transition: transform 0.3s ease;
    box-shadow: $shadow-sm;
    
    .icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 16px;
      height: 16px;
    }
  }
  
  &.dark {
    background: $primary-blue;
    
    .toggle-thumb {
      transform: translateX(30px);
    }
  }
}
```

### CSS Custom Properties for Theming
```scss
:root {
  --color-bg: #{$light-bg};
  --color-surface: #{$light-surface};
  --color-text-primary: #{$light-text-primary};
  --color-text-secondary: #{$light-text-secondary};
  --color-border: #{$light-border};
}

[data-theme="dark"] {
  --color-bg: #{$dark-bg};
  --color-surface: #{$dark-surface};
  --color-text-primary: #{$dark-text-primary};
  --color-text-secondary: #{$dark-text-secondary};
  --color-border: #{$dark-border};
}
```

## 🎯 User Experience Guidelines

### Navigation UX
- Clear visual hierarchy
- Breadcrumb navigation for blog posts
- Sticky navigation with current section indicator
- Mobile hamburger menu with smooth animations

### Loading States
```scss
.skeleton {
  background: linear-gradient(
    90deg,
    $light-surface-alt 25%,
    $light-surface 50%,
    $light-surface-alt 75%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: $radius;
}

@keyframes skeleton-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

### Micro-Interactions
- Hover effects on all interactive elements
- Smooth transitions between states
- Visual feedback for user actions
- Loading spinners for async operations

### Accessibility
- High contrast ratios (WCAG AA compliant)
- Focus indicators for keyboard navigation
- Screen reader friendly markup
- Reduced motion respect for users

## 📊 Performance Guidelines

### CSS Optimization
- Critical CSS inlined
- Non-critical CSS lazy loaded
- CSS Grid for layouts
- Minimized animations on mobile

### Image Optimization
- WebP format with fallbacks
- Lazy loading for images
- Responsive images with srcset
- Optimized SVG icons

## 🎨 Component Library Structure

```
src/
├── styles/
│   ├── abstracts/
│   │   ├── _variables.scss
│   │   ├── _mixins.scss
│   │   └── _functions.scss
│   ├── base/
│   │   ├── _reset.scss
│   │   ├── _typography.scss
│   │   └── _global.scss
│   ├── components/
│   │   ├── _buttons.scss
│   │   ├── _cards.scss
│   │   ├── _forms.scss
│   │   └── _navigation.scss
│   ├── layout/
│   │   ├── _grid.scss
│   │   ├── _header.scss
│   │   └── _footer.scss
│   └── themes/
│       ├── _light.scss
│       └── _dark.scss
```

This design system ensures consistency, accessibility, and modern aesthetics throughout the portfolio website while maintaining excellent performance and user experience.