import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceService } from '../../../../core/services/experience.service';
import { Experience } from '../../../../core/models/experience.model';
import { ExperienceCardComponent } from '../experience-card/experience-card';

@Component({
  selector: 'app-experience-timeline',
  imports: [CommonModule, ExperienceCardComponent],
  templateUrl: './experience-timeline.html',
  styleUrl: './experience-timeline.scss'
})
export class ExperienceTimelineComponent implements OnInit {
  experiences = signal<Experience[]>([]);
  filteredExperiences = signal<Experience[]>([]);
  selectedTechnology = signal<string>('');
  selectedCompany = signal<string>('');
  allTechnologies = signal<string[]>([]);
  allCompanies = signal<string[]>([]);

  constructor(private experienceService: ExperienceService) {}

  ngOnInit() {
    this.experiences.set(this.experienceService.getExperiences());
    this.filteredExperiences.set(this.experiences());
    this.allTechnologies.set(this.experienceService.getTechnologiesUsed());
    this.allCompanies.set(this.experienceService.getCompanies());
  }

  onExperienceToggle(id: string) {
    this.experienceService.toggleExperience(id);
  }

  onTechnologyChange(event: Event) {
    const technology = (event.target as HTMLSelectElement).value;
    this.selectedTechnology.set(technology);
    this.applyFilters();
  }

  onCompanyChange(event: Event) {
    const company = (event.target as HTMLSelectElement).value;
    this.selectedCompany.set(company);
    this.applyFilters();
  }

  filterByTechnology(technology: string) {
    this.selectedTechnology.set(technology);
    this.applyFilters();
  }

  filterByCompany(company: string) {
    this.selectedCompany.set(company);
    this.applyFilters();
  }

  clearFilters() {
    this.selectedTechnology.set('');
    this.selectedCompany.set('');
    this.filteredExperiences.set(this.experiences());
  }

  private applyFilters() {
    let filtered = this.experiences();

    if (this.selectedTechnology()) {
      filtered = this.experienceService.getExperiencesByTechnology(this.selectedTechnology());
    }

    if (this.selectedCompany()) {
      filtered = filtered.filter(exp =>
        exp.company.toLowerCase().includes(this.selectedCompany().toLowerCase())
      );
    }

    this.filteredExperiences.set(filtered);
  }
}
