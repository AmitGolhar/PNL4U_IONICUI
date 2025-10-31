import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private baseUrl = 'http://localhost:8080/api/profiles';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (!userId) {
      console.warn('❗ Missing userId in localStorage');
    }

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-User-Id': userId ? userId : '0' 
    });

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  /** 🧠 Get current user profile */
  getMyProfile(): Observable<any> {
    return this.http.get(`${this.baseUrl}/me`, { headers: this.getHeaders() });
  }

  /** ✏️ Create or update profile */
  saveProfile(profile: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, profile, { headers: this.getHeaders() });
  }

  /** ❌ Delete my profile */
  deleteMyProfile(): Observable<any> {
    return this.http.delete(`${this.baseUrl}/me`, { headers: this.getHeaders() });
  }
}
