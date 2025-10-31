import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

 /** 🟢 Login */
  login(credentials: { loginId: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/signin`, credentials);
  }

  /** 🔵 Signup */
  signup(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, data);
  }

  /** 🔁 Refresh Token (optional future) */
  refreshToken(token: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/refresh-token`, { refreshToken: token });
  }
}
