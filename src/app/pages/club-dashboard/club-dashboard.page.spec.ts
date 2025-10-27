import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClubDashboardPage } from './club-dashboard.page';

describe('ClubDashboardPage', () => {
  let component: ClubDashboardPage;
  let fixture: ComponentFixture<ClubDashboardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
