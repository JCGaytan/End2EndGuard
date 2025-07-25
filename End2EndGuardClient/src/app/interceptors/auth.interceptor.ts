import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
// Optionally import AuthService if you want to use it for token checks

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  // If you have AuthService, inject it here for more robust checks

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // Only redirect if 401, not already on login, and user is truly unauthenticated
        if (
          error.status === 401 &&
          this.router.url !== '/login' &&
          !this.isAuthenticated()
        ) {
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }

  // Simple check for authentication (customize as needed)
  private isAuthenticated(): boolean {
    // Example: check for a JWT token in localStorage or sessionStorage
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    // Optionally, add logic to check if token is expired
    return !!token;
  }
}