import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


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

export interface User {
  id: number;
  username: string;
  email: string;
  phone?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClubRequestService {

        private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  submitClubRequest(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/clubs/request/submit`, formData);
  }

  getAll(): Observable<ClubRequest[]> {
    return this.http.get<ClubRequest[]>(`${this.baseUrl}/clubs/requests/all`);
  }

  getPending(): Observable<ClubRequest[]> {
    return this.http.get<ClubRequest[]>(`${this.baseUrl}/clubs/requests/pending`);
  }

  getApproved(): Observable<ClubRequest[]> {
    return this.http.get<ClubRequest[]>(`${this.baseUrl}/clubs/requests/approved`);
  }

  getRejected(): Observable<ClubRequest[]> {
    return this.http.get<ClubRequest[]>(`${this.baseUrl}/clubs/requests/rejected`);
  }

 

    approveRequest(requestId: number, approvalData: any): Observable<any> {
      return this.http.post(`${this.baseUrl}/clubs/requests/${requestId}/approve`, approvalData);
    }



  reject(id: number, adminName: string, remarks?: string): Observable<ClubRequest> {
    return this.http.put<ClubRequest>(
      `${this.baseUrl}/clubs/requests/${id}/reject?adminName=${adminName}&remarks=${remarks}`,
      {}
    );
  }
  
  searchUsers(query: string): Observable<User[]> {
  return this.http.get<User[]>(`${this.baseUrl}/clubs/users/search?query=${query}`);
}


}
