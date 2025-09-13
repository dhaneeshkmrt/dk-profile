# Development Workflow Guide

## Commit & Testing Workflow

This project follows a strict workflow where every feature, functionality, or bug fix must be validated with Playwright E2E tests before committing.

## 🔄 Workflow Steps

### 1. Before Starting a Feature
```bash
# Make sure you're on the latest main branch
git checkout main
git pull origin main

# Create a new feature branch
git checkout -b feature/your-feature-name
```

### 2. During Development
```bash
# Keep the dev server running
npm start

# In another terminal, watch for file changes (optional)
npm run watch
```

### 3. After Implementing a Feature

#### Step 3.1: Run Build Validation
```bash
# Build the project to check for compilation errors
npm run build
```

#### Step 3.2: Run E2E Tests
```bash
# Run all E2E tests
npm run e2e

# Or run specific test file
npx playwright test e2e/tests/your-test.spec.ts

# For debugging failed tests
npm run e2e:debug

# To see the test UI
npm run e2e:ui
```

#### Step 3.3: View Test Report
```bash
# If tests fail, view the detailed report
npm run e2e:report
```

### 4. Commit Your Changes

#### Step 4.1: Stage Changes
```bash
# Check what files have changed
git status

# Stage specific files
git add src/app/features/your-feature/

# Or stage all changes (be careful)
git add .
```

#### Step 4.2: Create Commit
```bash
# Commit with a descriptive message
git commit -m "feat: add hero section with animated typing effect

- Implemented hero component with typing animation
- Added responsive design for mobile/tablet/desktop
- Integrated with theme service for dark/light mode
- Added E2E tests for hero section functionality"
```

### 5. Push to Remote
```bash
# Push your feature branch
git push origin feature/your-feature-name

# For first push of a new branch
git push -u origin feature/your-feature-name
```

## 📝 Commit Message Format

Follow conventional commits format:

### Types:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks
- `perf:` Performance improvements

### Examples:
```bash
feat: add navigation component with glassmorphism effect
fix: resolve theme toggle animation issue in Safari
docs: update README with deployment instructions
test: add E2E tests for contact form validation
refactor: optimize bundle size for shared components
```

## 🧪 E2E Testing Guidelines

### Test Structure
```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should do something specific', async ({ page }) => {
    // Test implementation
  });
});
```

### What to Test:
1. **Visual Elements**: Presence and visibility
2. **Interactions**: Clicks, form submissions, navigation
3. **Responsive Design**: Different viewport sizes
4. **Accessibility**: ARIA labels, keyboard navigation
5. **Theme**: Light/dark mode switching
6. **Performance**: Loading states, animations

### Running Tests in Different Modes:
```bash
# Run tests in headed mode (see browser)
npx playwright test --headed

# Run tests in specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run tests for mobile
npx playwright test --project="Mobile Chrome"
npx playwright test --project="Mobile Safari"

# Generate new test with codegen
npx playwright codegen http://localhost:4200
```

## 🚨 Pre-Commit Checklist

Before every commit, ensure:

- [ ] Code compiles without errors (`npm run build`)
- [ ] All E2E tests pass (`npm run e2e`)
- [ ] No console errors in browser
- [ ] Feature works in Chrome, Firefox, Safari
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Theme (light/dark) works correctly
- [ ] Accessibility standards met
- [ ] Code follows project style guide
- [ ] Commit message follows convention

## 🔍 Troubleshooting

### If Build Fails:
```bash
# Check for TypeScript errors
npx tsc --noEmit

# Check for SCSS errors
npm run build -- --verbose
```

### If E2E Tests Fail:
```bash
# Run in debug mode
npm run e2e:debug

# Check test report
npm run e2e:report

# Update browser binaries
npx playwright install
```

### If Git Push Fails:
```bash
# Fetch latest changes
git fetch origin

# Rebase your changes
git rebase origin/main

# Force push if needed (be careful!)
git push --force-with-lease origin feature/your-feature-name
```

## 📊 Continuous Integration

When pushing to main branch:
1. GitHub Actions will run build validation
2. E2E tests will run automatically
3. If all checks pass, deployment to GitHub Pages occurs

## 🎯 Best Practices

1. **Small, Focused Commits**: Each commit should represent one logical change
2. **Test Everything**: Write E2E tests for new features
3. **Clean Code**: Remove console.logs and commented code
4. **Documentation**: Update relevant docs with your changes
5. **Review**: Self-review your code before committing

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Angular Style Guide](https://angular.io/guide/styleguide)
- [Git Best Practices](https://git-scm.com/book/en/v2)

---

Last Updated: 2025-01-15