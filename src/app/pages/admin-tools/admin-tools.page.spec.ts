import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminToolsPage } from './admin-tools.page';

describe('AdminToolsPage', () => {
  let component: AdminToolsPage;
  let fixture: ComponentFixture<AdminToolsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminToolsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
