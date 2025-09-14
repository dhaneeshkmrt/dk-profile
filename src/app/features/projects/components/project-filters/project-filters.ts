import { Component, Input, Output, EventEmitter, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCategory, ProjectStatus, ProjectFilter } from '../../../../core/models/project.model';

@Component({
  selector: 'app-project-filters',
  imports: [CommonModule],
  templateUrl: './project-filters.html',
  styleUrl: './project-filters.scss'
})
export class ProjectFiltersComponent implements OnInit {
  @Input() technologies: string[] = [];
  @Input() companies: string[] = [];
  @Input() categories: ProjectCategory[] = [];
  @Input() statuses: ProjectStatus[] = [];
  @Input() currentFilter: ProjectFilter = {};

  @Output() filterChange = new EventEmitter<ProjectFilter>();
  @Output() clearFilters = new EventEmitter<void>();

  selectedCategory = signal<ProjectCategory | ''>('');
  selectedStatus = signal<ProjectStatus | ''>('');
  selectedTechnology = signal<string>('');
  selectedCompany = signal<string>('');

  ngOnInit() {
    this.selectedCategory.set(this.currentFilter.category || '');
    this.selectedStatus.set(this.currentFilter.status || '');
    this.selectedTechnology.set(this.currentFilter.technology || '');
    this.selectedCompany.set(this.currentFilter.company || '');
  }

  handleCategoryChange(event: Event) {
    const category = (event.target as HTMLSelectElement).value;
    this.selectedCategory.set(category as ProjectCategory || '');
    this.emitFilterChange();
  }

  handleStatusChange(event: Event) {
    const status = (event.target as HTMLSelectElement).value;
    this.selectedStatus.set(status as ProjectStatus || '');
    this.emitFilterChange();
  }

  handleTechnologyChange(event: Event) {
    const technology = (event.target as HTMLSelectElement).value;
    this.selectedTechnology.set(technology);
    this.emitFilterChange();
  }

  handleCompanyChange(event: Event) {
    const company = (event.target as HTMLSelectElement).value;
    this.selectedCompany.set(company);
    this.emitFilterChange();
  }

  onCategoryChange(category: string) {
    this.selectedCategory.set(category as ProjectCategory || '');
    this.emitFilterChange();
  }

  onStatusChange(status: string) {
    this.selectedStatus.set(status as ProjectStatus || '');
    this.emitFilterChange();
  }

  onTechnologyChange(technology: string) {
    this.selectedTechnology.set(technology);
    this.emitFilterChange();
  }

  onCompanyChange(company: string) {
    this.selectedCompany.set(company);
    this.emitFilterChange();
  }

  onClearFilters() {
    this.selectedCategory.set('');
    this.selectedStatus.set('');
    this.selectedTechnology.set('');
    this.selectedCompany.set('');
    this.clearFilters.emit();
  }

  private emitFilterChange() {
    const filter: ProjectFilter = {};

    if (this.selectedCategory()) filter.category = this.selectedCategory() as ProjectCategory;
    if (this.selectedStatus()) filter.status = this.selectedStatus() as ProjectStatus;
    if (this.selectedTechnology()) filter.technology = this.selectedTechnology();
    if (this.selectedCompany()) filter.company = this.selectedCompany();

    this.filterChange.emit(filter);
  }

  get hasActiveFilters(): boolean {
    return !!(this.selectedCategory() || this.selectedStatus() ||
              this.selectedTechnology() || this.selectedCompany());
  }
}
