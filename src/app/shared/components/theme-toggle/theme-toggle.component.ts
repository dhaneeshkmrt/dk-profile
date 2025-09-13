import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'dk-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      class="theme-toggle"
      [class.dark]="themeService.isDark()"
      (click)="toggleTheme()"
      [attr.aria-label]="ariaLabel()"
      type="button"
    >
      <div class="toggle-thumb">
        <span 
          class="icon icon-sun material-icons"
          [class.opacity-0]="themeService.isDark()"
        >
          light_mode
        </span>
        <span 
          class="icon icon-moon material-icons"
          [class.opacity-0]="themeService.isLight()"
        >
          dark_mode
        </span>
      </div>
    </button>
  `,
  styleUrl: './theme-toggle.component.scss'
})
export class ThemeToggleComponent {
  protected readonly themeService = inject(ThemeService);
  
  protected ariaLabel() {
    return `Switch to ${this.themeService.isDark() ? 'light' : 'dark'} theme`;
  }
  
  protected toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}