import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'dk-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [class]="buttonClasses()"
      [disabled]="disabled()"
      [type]="type()"
      (click)="handleClick($event)"
    >
      @if (icon()) {
        <span class="material-icons btn-icon">{{ icon() }}</span>
      }
      <span class="btn-content">
        <ng-content />
      </span>
      @if (loading()) {
        <div class="btn-spinner">
          <div class="spinner"></div>
        </div>
      }
    </button>
  `,
  styleUrl: './dk-button.component.scss'
})
export class DkButtonComponent {
  // Inputs using new signal-based API
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly disabled = input<boolean>(false);
  readonly loading = input<boolean>(false);
  readonly icon = input<string>();
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly fullWidth = input<boolean>(false);
  
  // Output using new signal-based API
  readonly buttonClicked = output<MouseEvent>();
  
  // Computed classes for the button
  protected readonly buttonClasses = computed(() => {
    const classes = [
      'btn',
      `btn--${this.variant()}`,
      `btn--${this.size()}`,
    ];
    
    if (this.disabled()) classes.push('btn--disabled');
    if (this.loading()) classes.push('btn--loading');
    if (this.fullWidth()) classes.push('btn--full-width');
    if (this.icon() && !this.hasContent()) classes.push('btn--icon-only');
    
    return classes.join(' ');
  });
  
  protected handleClick(event: MouseEvent): void {
    if (!this.disabled() && !this.loading()) {
      this.buttonClicked.emit(event);
    }
  }
  
  private hasContent(): boolean {
    // This is a simplified check - in a real implementation,
    // you might want to check if there's actual content projected
    return true;
  }
}