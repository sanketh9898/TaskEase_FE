import { Injectable, inject, PLATFORM_ID, Inject } from '@angular/core'; // Import PLATFORM_ID
        import { HttpClient } from '@angular/common/http';
        import { Observable, BehaviorSubject } from 'rxjs';
        import { tap } from 'rxjs/operators';
        import { environment } from '../../environments/environment';
        import { LoginRequest } from '../models/login-request';
        import { RegisterRequest } from '../models/register-request';
        import { isPlatformBrowser } from '@angular/common'; // Import isPlatformBrowser

        @Injectable({
          providedIn: 'root'
        })
        export class AuthService {

          private apiUrl = environment.apiUrl;
          private currentUserSubject = new BehaviorSubject<string | null>(this.getToken());
          currentUser$ = this.currentUserSubject.asObservable();
          private http: HttpClient;

          constructor(@Inject(PLATFORM_ID) private platformId: Object) { // Inject PLATFORM_ID
            this.http = inject(HttpClient);
          }

          register(registerRequest: RegisterRequest): Observable<any> {
            return this.http.post(`${this.apiUrl}/auth/register`, registerRequest);
          }

          login(loginRequest: LoginRequest): Observable<{ token: string }> {
            return this.http.post<{ token: string }>(`${this.apiUrl}/auth/login`, loginRequest).pipe(
              tap(response => {
                this.setToken(response.token);
              })
            );
          }

          logout() {
            this.removeToken();
            this.currentUserSubject.next(null);
          }

            // Helper methods for token management
          private setToken(token: string) {
            if (isPlatformBrowser(this.platformId)) { // Check if in browser
                localStorage.setItem('authToken', token);
                this.currentUserSubject.next(token);
            }
          }

          private getToken(): string | null {
            if (isPlatformBrowser(this.platformId)) { // Check if in browser
              return localStorage.getItem('authToken');
            }
            return null; // Return null if not in browser
          }

          private removeToken() {
            if (isPlatformBrowser(this.platformId)) { // Check if in browser
                localStorage.removeItem('authToken');
            }
          }

          isAuthenticated(): boolean {
            if (isPlatformBrowser(this.platformId)) { // Check if in browser
                return !!this.getToken();
            }
            return false;
          }
          getToken1(): string | null {
            return this.getToken();
          }
        }