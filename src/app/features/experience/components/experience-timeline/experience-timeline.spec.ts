import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceTimeline } from './experience-timeline';

describe('ExperienceTimeline', () => {
  let component: ExperienceTimeline;
  let fixture: ComponentFixture<ExperienceTimeline>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceTimeline]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperienceTimeline);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
