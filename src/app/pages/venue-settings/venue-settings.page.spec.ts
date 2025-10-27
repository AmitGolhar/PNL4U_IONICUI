import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VenueSettingsPage } from './venue-settings.page';

describe('VenueSettingsPage', () => {
  let component: VenueSettingsPage;
  let fixture: ComponentFixture<VenueSettingsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
