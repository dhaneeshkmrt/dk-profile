import { Component } from '@angular/core';
import { ProjectsGridComponent } from './components/projects-grid/projects-grid';

@Component({
  selector: 'app-projects',
  imports: [ProjectsGridComponent],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class ProjectsComponent {

}
