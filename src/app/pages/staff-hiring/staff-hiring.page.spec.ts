import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StaffHiringPage } from './staff-hiring.page';

describe('StaffHiringPage', () => {
  let component: StaffHiringPage;
  let fixture: ComponentFixture<StaffHiringPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffHiringPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
