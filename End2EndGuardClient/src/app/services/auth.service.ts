import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

/**
 * Service responsible for authentication state management.
 * Handles JWT token storage, validation, and logout operations.
 * Works in conjunction with ApiService for actual authentication requests.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  /**
   * Checks if the user is currently authenticated.
   * @returns true if valid JWT token exists in local storage
   */
  isAuthenticated(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }
    const token = localStorage.getItem('token');
    return !!token;
  }

  /**
   * Stores the JWT token after successful authentication.
   * @param token - JWT token received from the backend
   */
  setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
    }
  }

  /**
   * Logs out the user by clearing stored token and redirecting to login.
   * This method is called automatically when token expires or is invalid.
   */
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
    this.router.navigate(['/login']);
  }
}
