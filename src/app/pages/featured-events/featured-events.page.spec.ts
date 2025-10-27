import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeaturedEventsPage } from './featured-events.page';

describe('FeaturedEventsPage', () => {
  let component: FeaturedEventsPage;
  let fixture: ComponentFixture<FeaturedEventsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedEventsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
