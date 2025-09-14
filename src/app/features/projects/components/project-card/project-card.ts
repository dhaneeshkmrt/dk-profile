import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project, ProjectStatus, ProjectCategory } from '../../../../core/models/project.model';

@Component({
  selector: 'app-project-card',
  imports: [CommonModule],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss'
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: Project;
  @Output() viewDetails = new EventEmitter<string>();

  onViewDetails() {
    this.viewDetails.emit(this.project.id);
  }

  get statusColor(): string {
    switch (this.project.status) {
      case ProjectStatus.COMPLETED:
        return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
      case ProjectStatus.ONGOING:
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300';
      case ProjectStatus.MAINTAINED:
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
      case ProjectStatus.ARCHIVED:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-300';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-300';
    }
  }

  get categoryColor(): string {
    switch (this.project.category) {
      case ProjectCategory.ENTERPRISE:
        return 'text-purple-600 bg-purple-100 dark:bg-purple-900 dark:text-purple-300';
      case ProjectCategory.OPENSOURCE:
        return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
      case ProjectCategory.PERSONAL:
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300';
      case ProjectCategory.CLIENT:
        return 'text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-300';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-300';
    }
  }

  get projectDuration(): string {
    if (!this.project.endDate) {
      const start = new Date(this.project.startDate);
      const now = new Date();
      const months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
      return `${months}+ months (ongoing)`;
    }

    const start = new Date(this.project.startDate);
    const end = new Date(this.project.endDate);
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());

    if (months < 12) {
      return `${months} month${months !== 1 ? 's' : ''}`;
    }

    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    let duration = `${years} year${years !== 1 ? 's' : ''}`;
    if (remainingMonths > 0) {
      duration += `, ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    }
    return duration;
  }
}
