import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsService } from '../../../../core/services/projects.service';
import { Project, ProjectFilter } from '../../../../core/models/project.model';
import { ProjectCardComponent } from '../project-card/project-card';
import { ProjectFiltersComponent } from '../project-filters/project-filters';

@Component({
  selector: 'app-projects-grid',
  imports: [CommonModule, ProjectCardComponent, ProjectFiltersComponent],
  templateUrl: './projects-grid.html',
  styleUrl: './projects-grid.scss'
})
export class ProjectsGridComponent implements OnInit {
  projects = signal<Project[]>([]);
  filteredProjects = signal<Project[]>([]);
  currentFilter = signal<ProjectFilter>({});

  allTechnologies = signal<string[]>([]);
  allCompanies = signal<string[]>([]);
  allCategories = signal<any[]>([]);
  allStatuses = signal<any[]>([]);

  constructor(private projectsService: ProjectsService) {}

  ngOnInit() {
    this.projects.set(this.projectsService.getProjects());
    this.filteredProjects.set(this.projects());

    this.allTechnologies.set(this.projectsService.getAllTechnologies());
    this.allCompanies.set(this.projectsService.getAllCompanies());
    this.allCategories.set(this.projectsService.getAllCategories());
    this.allStatuses.set(this.projectsService.getAllStatuses());
  }

  onFilterChange(filter: ProjectFilter) {
    this.currentFilter.set(filter);
    this.projectsService.filterProjects(filter);
    this.filteredProjects.set(this.projectsService.getFilteredProjects());
  }

  onClearFilters() {
    this.currentFilter.set({});
    this.projectsService.clearFilters();
    this.filteredProjects.set(this.projectsService.getFilteredProjects());
  }

  onViewProjectDetails(projectId: string) {
    // TODO: Navigate to project details or open modal
    console.log('View project details:', projectId);
  }
}
