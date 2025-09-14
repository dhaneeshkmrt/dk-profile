import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface NavItem {
  label: string;
  path: string;
  isRoute: boolean;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class NavbarComponent {
  isMobileMenuOpen = signal(false);

  navItems = signal<NavItem[]>([
    { label: 'Home', path: '/', isRoute: true },
    { label: 'About', path: '#about', isRoute: false },
    { label: 'Experience', path: '/experience', isRoute: true },
    { label: 'Skills', path: '#skills', isRoute: false },
    { label: 'Projects', path: '/projects', isRoute: true },
    { label: 'Blog', path: '#blog', isRoute: false },
    { label: 'Contact', path: '#contact', isRoute: false }
  ]);

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(state => !state);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  navigateToSection(path: string, isRoute: boolean): void {
    if (isRoute) {
      // Router navigation will be handled by routerLink
      this.closeMobileMenu();
    } else {
      // Scroll to section
      const element = document.querySelector(path);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        this.closeMobileMenu();
      }
    }
  }
}