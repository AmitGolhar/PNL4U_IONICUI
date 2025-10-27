import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobApplicationsPage } from './job-applications.page';

describe('JobApplicationsPage', () => {
  let component: JobApplicationsPage;
  let fixture: ComponentFixture<JobApplicationsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JobApplicationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
