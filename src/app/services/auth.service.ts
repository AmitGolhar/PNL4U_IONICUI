import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = environment.apiUrl;

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const stored = localStorage.getItem('user');
    if (stored) this.currentUserSubject.next(JSON.parse(stored));
  }

  /** 🟢 Login */
  login(credentials: { loginId: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/signin`, credentials).pipe(
      tap((res: any) => {
        if (res.token) {
          this.saveTokens(res.token, res.refreshToken);
          if (res.clubId) {
            this.saveClubId(res.clubId);
          }
          this.setCurrentUserFromToken(res.token);
        }
      })
    );
  }
  saveClubId(clubId: any) {
    localStorage.setItem('clubId', clubId);
  }

  /** 🔵 Signup */
  signup(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/signup`, data);
  }

  /** 🧠 Decode JWT and set current user */
  private setCurrentUserFromToken(token: string): void {
    try {
      const decoded: any = jwtDecode(token);

      const user: User = {
        id: decoded.id,
        username: decoded.sub || decoded.username,
        email: decoded.email,
        roles: decoded.roles || [], // expect an array of role names
        token,
      };

      localStorage.setItem('user', JSON.stringify(user));
      this.currentUserSubject.next(user);
    } catch (err) {
      console.error('Failed to decode JWT:', err);
    }
  }

  /** 💾 Token helpers */
  getAccessToken(): string | null {
    return localStorage.getItem('token');
  }
  // ✅ Save token after login
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // ✅ Retrieve token
  getToken(): string | null {
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
    localStorage.removeItem('user');
    localStorage.removeItem('roles');
    localStorage.removeItem('clubId');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    this.currentUserSubject.next(null);
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    return this.http
      .post(`${this.baseUrl}/auth/refresh-token`, { refreshToken })
      .pipe(
        tap((res: any) => {
          this.saveTokens(res.token, res.refreshToken);
          this.setCurrentUserFromToken(res.token);
        })
      );
  }

  /** 🔐 Helpers for UI and guards */
  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  hasRole(role: string): boolean {
    return this.currentUser?.roles?.includes(role as any) ?? false;
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  logout() {
    this.clearTokens();
    this.router.navigate(['/tabs/home']);
  }
}
