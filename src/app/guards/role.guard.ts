import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles = route.data['roles'] as string[];

    // 🔐 Try to get token (prefer latest from AuthService or localStorage)
   const token = this.auth.getToken() || localStorage.getItem('token');

    if (!token) {
      console.warn('🚫 No token found. Redirecting to login.');
      this.router.navigate(['/login']);
      return false;
    }

    try {
      // 🧠 Decode token payload
      const decoded: any = jwtDecode(token);
      const userRoles: string[] = decoded.roles || [];

      // 🕒 Optional: token expiration check
      const now = Math.floor(Date.now() / 1000);
      if (decoded.exp && decoded.exp < now) {
        console.warn('⚠️ Token expired. Logging out.');
        this.auth.logout?.();
        this.router.navigate(['/login']);
        return false;
      }

      // ✅ Allow if any expected role is present
      const hasAccess = expectedRoles.some(role => userRoles.includes(role));

      if (!hasAccess) {
        console.warn('🚫 Access denied. User roles:', userRoles, 'Expected:', expectedRoles);
        this.router.navigate(['/unauthorized']);
        return false;
      }

      return true; // ✅ Authorized
    } catch (error) {
      console.error('Error decoding JWT:', error);
      this.router.navigate(['/login']);
      return false;
    }
  }
}
