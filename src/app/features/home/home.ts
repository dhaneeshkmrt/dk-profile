import { Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero';
import { AboutSummaryComponent } from './components/about-summary/about-summary';
import { SkillsShowcaseComponent } from './components/skills-showcase/skills-showcase';
import { ExperienceHighlightsComponent } from './components/experience-highlights/experience-highlights';
import { ProjectsPreviewComponent } from './components/projects-preview/projects-preview';
import { ContactCtaComponent } from './components/contact-cta/contact-cta';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    AboutSummaryComponent,
    SkillsShowcaseComponent,
    ExperienceHighlightsComponent,
    ProjectsPreviewComponent,
    ContactCtaComponent
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent {

}