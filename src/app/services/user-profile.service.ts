import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
  // 🌍 Public: Get all public profiles for discovery feed (Tinder-style)
 // 🌍 Public: Get all public profiles (optionally filter by city)
  getAllPublicProfiles(city?: string): Observable<any[]> {
    let params = new HttpParams();
    if (city) {
      params = params.set('city', city);
    }
    return this.http.get<any[]>(`${this.baseUrl}/public`, { params });
  }

/*   getAllPublicProfiles(filters: { city?: string; gender?: string; interestedIn?: string }): Observable<any[]> {
  let params = new HttpParams();
  Object.keys(filters).forEach(key => {
    const val = filters[key as keyof typeof filters];
    if (val) params = params.set(key, val);
  });
  return this.http.get<any[]>(`${this.baseUrl}/public`, { params });
} */


  // 🌍 Get specific profile by ID
  getProfileById(userId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${userId}`);
  }
}
