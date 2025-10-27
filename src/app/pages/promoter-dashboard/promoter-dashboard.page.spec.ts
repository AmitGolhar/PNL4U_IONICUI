import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PromoterDashboardPage } from './promoter-dashboard.page';

describe('PromoterDashboardPage', () => {
  let component: PromoterDashboardPage;
  let fixture: ComponentFixture<PromoterDashboardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoterDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
