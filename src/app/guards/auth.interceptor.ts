import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Skip all authentication endpoints
    if (req.url.includes('/api/auth/')) {
      return next.handle(req);
    }

    // Get the access token from localStorage
    const token = localStorage.getItem('token');

    // If token exists, attach it
    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(cloned);
    }

    // Otherwise, continue without token
    return next.handle(req);
  }
}
