import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //private baseUrl = 'http://localhost:8080/api/auth';
    private baseUrl = environment.apiUrl;

 

  constructor(private http: HttpClient) {}

 /** 🟢 Login */
  login(credentials: { loginId: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/signin`, credentials);


    
  }

  /** 🔵 Signup */
  signup(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/signup`, data);
  }

 

  getAccessToken(): string | null {
    return localStorage.getItem('token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  saveTokens(token: string, refreshToken: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
  }

  clearTokens(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    return this.http.post(`${this.baseUrl}/auth/refresh-token`, { refreshToken })
      .pipe(
        tap((res: any) => {
          this.saveTokens(res.token, res.refreshToken);
        })
      );
  }

}
