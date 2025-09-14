import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Experience } from '../../../../core/models/experience.model';

@Component({
  selector: 'app-experience-card',
  imports: [CommonModule],
  templateUrl: './experience-card.html',
  styleUrl: './experience-card.scss'
})
export class ExperienceCardComponent {
  @Input({ required: true }) experience!: Experience;
  @Output() toggleExpanded = new EventEmitter<string>();

  onToggleExpand() {
    this.toggleExpanded.emit(this.experience.id);
  }

  get isCurrentPosition(): boolean {
    return this.experience.endDate === 'Present';
  }

  get displayDuration(): string {
    const start = new Date(this.experience.startDate);
    const end = this.experience.endDate === 'Present'
      ? new Date()
      : new Date(this.experience.endDate);

    const months = (end.getFullYear() - start.getFullYear()) * 12 +
                   (end.getMonth() - start.getMonth());

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
