import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFilters } from './project-filters';

describe('ProjectFilters', () => {
  let component: ProjectFilters;
  let fixture: ComponentFixture<ProjectFilters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectFilters]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectFilters);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
