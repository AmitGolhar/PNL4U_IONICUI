import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { JobApplication } from '../models/job.model';

@Injectable({ providedIn: 'root' })
export class JobApplicationService {
  private applications: JobApplication[] = [
    {
      id: 1,
      fullName: 'Amit Sharma',
      email: 'amit@example.com',
      phone: '+91 9876543210',
      position: 'Event Manager',
      experience: '3 years in club event coordination',
      resumeUrl: 'https://example.com/resume.pdf',
      status: 'Reviewed'
    },
    {
      id: 2,
      fullName: 'Priya Mehta',
      email: 'priya@example.com',
      phone: '+91 9988776655',
      position: 'Bartender',
      experience: '2 years mixology experience at Neon Lounge',
      status: 'Pending'
    }
  ];

  getApplications(): Observable<JobApplication[]> {
    return of(this.applications);
  }

  submitApplication(app: JobApplication): Observable<JobApplication> {
    const newApp: JobApplication = {
      ...app,
      id: this.applications.length + 1,
      status: 'Pending'
    };
    this.applications.push(newApp);
    return of(newApp);
  }
}
