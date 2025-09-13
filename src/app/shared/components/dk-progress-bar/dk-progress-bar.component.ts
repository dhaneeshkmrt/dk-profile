import { Component, input, computed, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ProgressVariant = 'default' | 'gradient' | 'striped';
export type ProgressSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'dk-progress-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="progressClasses()">
      @if (label()) {
        <div class="progress-label">
          <span class="progress-text">{{ label() }}</span>
          @if (showValue()) {
            <span class="progress-value">{{ displayValue() }}</span>
          }
        </div>
      }
      
      <div class="progress-track">
        <div 
          class="progress-fill"
          [style.width.%]="animatedValue()"
          [attr.aria-valuenow]="value()"
          [attr.aria-valuemin]="min()"
          [attr.aria-valuemax]="max()"
          role="progressbar"
        >
          @if (animated()) {
            <div class="progress-shimmer"></div>
          }
        </div>
      </div>
      
      @if (description()) {
        <div class="progress-description">
          {{ description() }}
        </div>
      }
    </div>
  `,
  styleUrl: './dk-progress-bar.component.scss'
})
export class DkProgressBarComponent {
  // Inputs using new signal-based API
  readonly value = input.required<number>();
  readonly min = input<number>(0);
  readonly max = input<number>(100);
  readonly label = input<string>();
  readonly description = input<string>();
  readonly variant = input<ProgressVariant>('default');
  readonly size = input<ProgressSize>('md');
  readonly animated = input<boolean>(true);
  readonly showValue = input<boolean>(true);
  readonly color = input<string>();
  
  // Internal signal for animated value
  protected readonly animatedValue = signal<number>(0);
  
  // Computed values
  protected readonly progressClasses = computed(() => {
    const classes = [
      'progress',
      `progress--${this.variant()}`,
      `progress--${this.size()}`,
    ];
    
    if (this.animated()) classes.push('progress--animated');
    if (this.color()) classes.push('progress--custom-color');
    
    return classes.join(' ');
  });
  
  protected readonly displayValue = computed(() => {
    const percentage = this.getPercentage();
    return `${Math.round(percentage)}%`;
  });
  
  constructor() {
    // Animate to target value on initialization and when value changes
    effect(() => {
      const targetValue = this.getPercentage();
      if (this.animated()) {
        this.animateToValue(targetValue);
      } else {
        this.animatedValue.set(targetValue);
      }
    });
  }
  
  private getPercentage(): number {
    const value = Math.max(this.min(), Math.min(this.max(), this.value()));
    const range = this.max() - this.min();
    return range > 0 ? ((value - this.min()) / range) * 100 : 0;
  }
  
  private animateToValue(targetValue: number): void {
    const startValue = this.animatedValue();
    const difference = targetValue - startValue;
    const duration = 800; // Animation duration in ms
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out)
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (difference * easedProgress);
      
      this.animatedValue.set(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }
}