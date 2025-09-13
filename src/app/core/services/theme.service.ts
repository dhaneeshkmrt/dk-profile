import { Injectable, signal, computed, effect } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly themeKey = 'dk-portfolio-theme';
  
  // Signals for theme state
  readonly currentTheme = signal<Theme>('light');
  readonly systemPreference = signal<Theme>('light');
  
  // Computed signal to determine if system preference matches current theme
  readonly isSystemTheme = computed(() => 
    this.currentTheme() === this.systemPreference()
  );
  
  constructor() {
    this.initializeTheme();
    this.watchSystemPreference();
    
    // Effect to update document attribute when theme changes
    effect(() => {
      this.applyThemeToDocument(this.currentTheme());
    });
  }
  
  /**
   * Initialize theme from localStorage or system preference
   */
  private initializeTheme(): void {
    const savedTheme = localStorage.getItem(this.themeKey) as Theme;
    const systemTheme = this.getSystemPreference();
    
    this.systemPreference.set(systemTheme);
    
    if (savedTheme) {
      this.currentTheme.set(savedTheme);
    } else {
      this.currentTheme.set(systemTheme);
    }
  }
  
  /**
   * Watch for system preference changes
   */
  private watchSystemPreference(): void {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      // Initial system preference
      this.systemPreference.set(mediaQuery.matches ? 'dark' : 'light');
      
      // Listen for changes
      mediaQuery.addEventListener('change', (e) => {
        this.systemPreference.set(e.matches ? 'dark' : 'light');
      });
    }
  }
  
  /**
   * Get system preference
   */
  private getSystemPreference(): Theme {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  }
  
  /**
   * Apply theme to document
   */
  private applyThemeToDocument(theme: Theme): void {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }
  
  /**
   * Set theme explicitly
   */
  setTheme(theme: Theme): void {
    this.currentTheme.set(theme);
    localStorage.setItem(this.themeKey, theme);
  }
  
  /**
   * Toggle between light and dark themes
   */
  toggleTheme(): void {
    const newTheme = this.currentTheme() === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }
  
  /**
   * Reset to system preference
   */
  resetToSystem(): void {
    const systemTheme = this.systemPreference();
    this.setTheme(systemTheme);
    localStorage.removeItem(this.themeKey);
  }
  
  /**
   * Check if current theme is dark
   */
  isDark(): boolean {
    return this.currentTheme() === 'dark';
  }
  
  /**
   * Check if current theme is light
   */
  isLight(): boolean {
    return this.currentTheme() === 'light';
  }
  
  /**
   * Get theme as observable for template usage
   */
  getTheme() {
    return this.currentTheme.asReadonly();
  }
}