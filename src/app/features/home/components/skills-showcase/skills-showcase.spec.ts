import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsShowcase } from './skills-showcase';

describe('SkillsShowcase', () => {
  let component: SkillsShowcase;
  let fixture: ComponentFixture<SkillsShowcase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsShowcase]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillsShowcase);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
