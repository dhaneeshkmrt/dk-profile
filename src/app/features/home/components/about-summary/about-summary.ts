import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-about-summary',
  standalone: true,
  imports: [],
  templateUrl: './about-summary.html',
  styleUrl: './about-summary.scss'
})
export class AboutSummaryComponent {
  stats = signal([
    { value: '11+', label: 'Years Experience', icon: '💼' },
    { value: '25+', label: 'Repositories Managed', icon: '📦' },
    { value: '75%', label: 'Bundle Size Reduction', icon: '⚡' },
    { value: '7+', label: 'Years with Angular', icon: '🅰️' }
  ]);

  skills = signal([
    'Angular (4-20)', 'TypeScript', 'RxJS', 'NgRx & Signals',
    'Node.js', 'Design Systems', 'Team Leadership', 'Architecture'
  ]);
}
