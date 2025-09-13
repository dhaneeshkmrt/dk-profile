import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceHighlights } from './experience-highlights';

describe('ExperienceHighlights', () => {
  let component: ExperienceHighlights;
  let fixture: ComponentFixture<ExperienceHighlights>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceHighlights]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperienceHighlights);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
