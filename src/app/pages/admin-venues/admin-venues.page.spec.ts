import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminVenuesPage } from './admin-venues.page';

describe('AdminVenuesPage', () => {
  let component: AdminVenuesPage;
  let fixture: ComponentFixture<AdminVenuesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVenuesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
