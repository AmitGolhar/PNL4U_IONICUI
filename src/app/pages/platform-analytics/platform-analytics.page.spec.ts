import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlatformAnalyticsPage } from './platform-analytics.page';

describe('PlatformAnalyticsPage', () => {
  let component: PlatformAnalyticsPage;
  let fixture: ComponentFixture<PlatformAnalyticsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformAnalyticsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
