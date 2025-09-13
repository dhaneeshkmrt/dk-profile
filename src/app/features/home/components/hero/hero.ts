import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class HeroComponent implements OnInit, OnDestroy {
  currentText = signal('');
  currentIndex = signal(0);
  isDeleting = signal(false);
  private typingInterval?: number;
  
  private readonly texts = [
    'Senior Technical Lead',
    'Angular Expert',
    '11+ Years Experience',
    'Design System Architect',
    'Community Leader'
  ];
  
  private readonly typingSpeed = 100;
  private readonly deletingSpeed = 50;
  private readonly pauseDuration = 2000;

  ngOnInit(): void {
    this.startTypingAnimation();
  }

  ngOnDestroy(): void {
    if (this.typingInterval) {
      clearInterval(this.typingInterval);
    }
  }

  private startTypingAnimation(): void {
    let charIndex = 0;
    let textIndex = 0;
    let isDeleting = false;
    let isPaused = false;

    this.typingInterval = window.setInterval(() => {
      const currentFullText = this.texts[textIndex];
      
      if (!isDeleting && !isPaused) {
        // Typing
        charIndex++;
        this.currentText.set(currentFullText.substring(0, charIndex));
        
        if (charIndex === currentFullText.length) {
          isPaused = true;
          setTimeout(() => {
            isPaused = false;
            isDeleting = true;
            this.isDeleting.set(true);
          }, this.pauseDuration);
        }
      } else if (isDeleting && !isPaused) {
        // Deleting
        charIndex--;
        this.currentText.set(currentFullText.substring(0, charIndex));
        
        if (charIndex === 0) {
          isDeleting = false;
          this.isDeleting.set(false);
          textIndex = (textIndex + 1) % this.texts.length;
          this.currentIndex.set(textIndex);
        }
      }
    }, isDeleting ? this.deletingSpeed : this.typingSpeed);
  }

  scrollToSection(sectionId: string): void {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}