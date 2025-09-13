import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type CardVariant = 'default' | 'glass' | 'outlined' | 'elevated';

@Component({
  selector: 'dk-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="cardClasses()">
      @if (title()) {
        <header class="card-header">
          <h3 class="card-title">{{ title() }}</h3>
          @if (subtitle()) {
            <p class="card-subtitle">{{ subtitle() }}</p>
          }
        </header>
      }
      
      <div class="card-content">
        <ng-content />
      </div>
      
      @if (hasActions()) {
        <footer class="card-actions">
          <ng-content select="[slot=actions]" />
        </footer>
      }
    </div>
  `,
  styleUrl: './dk-card.component.scss'
})
export class DkCardComponent {
  // Inputs using new signal-based API
  readonly variant = input<CardVariant>('default');
  readonly title = input<string>();
  readonly subtitle = input<string>();
  readonly hoverable = input<boolean>(true);
  readonly clickable = input<boolean>(false);
  readonly loading = input<boolean>(false);
  
  // Computed classes for the card
  protected readonly cardClasses = computed(() => {
    const classes = [
      'card',
      `card--${this.variant()}`,
    ];
    
    if (this.hoverable()) classes.push('card--hoverable');
    if (this.clickable()) classes.push('card--clickable');
    if (this.loading()) classes.push('card--loading');
    
    return classes.join(' ');
  });
  
  protected hasActions(): boolean {
    // In a real implementation, you might want to check if actions are projected
    // This is a simplified version
    return false;
  }
}