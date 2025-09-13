import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutSummary } from './about-summary';

describe('AboutSummary', () => {
  let component: AboutSummary;
  let fixture: ComponentFixture<AboutSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutSummary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutSummary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
