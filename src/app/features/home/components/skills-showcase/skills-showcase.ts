import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-skills-showcase',
  standalone: true,
  imports: [],
  templateUrl: './skills-showcase.html',
  styleUrl: './skills-showcase.scss'
})
export class SkillsShowcaseComponent {
  skillCategories = signal([
    {
      id: 'frontend',
      name: 'Frontend',
      icon: '🎨',
      skills: [
        { name: 'Angular', level: 95, years: '7+' },
        { name: 'TypeScript', level: 90, years: '6+' },
        { name: 'RxJS', level: 85, years: '5+' },
        { name: 'HTML/CSS', level: 90, years: '11+' },
        { name: 'Tailwind CSS', level: 80, years: '2+' }
      ]
    },
    {
      id: 'backend',
      name: 'Backend',
      icon: '⚙️',
      skills: [
        { name: 'Node.js', level: 75, years: '4+' },
        { name: 'Express', level: 70, years: '3+' },
        { name: 'Python', level: 65, years: '2+' },
        { name: 'PostgreSQL', level: 70, years: '3+' },
        { name: 'MongoDB', level: 65, years: '2+' }
      ]
    },
    {
      id: 'tools',
      name: 'Tools & DevOps',
      icon: '🛠️',
      skills: [
        { name: 'Git', level: 90, years: '8+' },
        { name: 'AWS', level: 70, years: '3+' },
        { name: 'Docker', level: 65, years: '2+' },
        { name: 'Nx Monorepo', level: 85, years: '3+' },
        { name: 'CI/CD', level: 75, years: '4+' }
      ]
    }
  ]);
}
