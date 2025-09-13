import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface NavItem {
  label: string;
  path: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class NavbarComponent {
  isMobileMenuOpen = signal(false);
  
  navItems = signal<NavItem[]>([
    { label: 'Home', path: '#home' },
    { label: 'About', path: '#about' },
    { label: 'Experience', path: '#experience' },
    { label: 'Skills', path: '#skills' },
    { label: 'Projects', path: '#projects' },
    { label: 'Blog', path: '#blog' },
    { label: 'Contact', path: '#contact' }
  ]);

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(state => !state);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }
}