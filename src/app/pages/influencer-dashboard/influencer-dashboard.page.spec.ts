import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfluencerDashboardPage } from './influencer-dashboard.page';

describe('InfluencerDashboardPage', () => {
  let component: InfluencerDashboardPage;
  let fixture: ComponentFixture<InfluencerDashboardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InfluencerDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
