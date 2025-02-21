// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'; // Import provideHttpClient
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app-routing.module'; // Import your routes

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()), // Add this line
    provideAnimations(),
  ]
};