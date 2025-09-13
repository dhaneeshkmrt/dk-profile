import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsPreview } from './projects-preview';

describe('ProjectsPreview', () => {
  let component: ProjectsPreview;
  let fixture: ComponentFixture<ProjectsPreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsPreview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsPreview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
