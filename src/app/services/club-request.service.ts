import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface ClubRequest {
  id: number;
  clubName: string;
  ownerName: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  clubType: string;
  description: string;
  instagramHandle: string;
  website: string;
  wantWebsite: string;
  preferredPackage: string;
  status: string;
  submittedDate: string;
  reviewedDate?: string;
  reviewedBy?: string;
  reviewRemarks?: string;
  photo?: any;
}


@Injectable({
  providedIn: 'root'
})
export class ClubRequestService {

  private baseUrl = 'http://localhost:8080/api/clubs';

  constructor(private http: HttpClient) {}

  submitClubRequest(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/request/submit`, formData);
  }

  getAll(): Observable<ClubRequest[]> {
    return this.http.get<ClubRequest[]>(`${this.baseUrl}/requests/all`);
  }

  getPending(): Observable<ClubRequest[]> {
    return this.http.get<ClubRequest[]>(`${this.baseUrl}/requests/pending`);
  }

  getApproved(): Observable<ClubRequest[]> {
    return this.http.get<ClubRequest[]>(`${this.baseUrl}/requests/approved`);
  }

  getRejected(): Observable<ClubRequest[]> {
    return this.http.get<ClubRequest[]>(`${this.baseUrl}/requests/rejected`);
  }

  approve(id: number, adminName: string, remarks?: string): Observable<ClubRequest> {
    return this.http.put<ClubRequest>(
      `${this.baseUrl}/requests/${id}/approve?adminName=${adminName}&remarks=${remarks}`,
      {}
    );
  }

  reject(id: number, adminName: string, remarks?: string): Observable<ClubRequest> {
    return this.http.put<ClubRequest>(
      `${this.baseUrl}/requests/${id}/reject?adminName=${adminName}&remarks=${remarks}`,
      {}
    );
  }
  
}
