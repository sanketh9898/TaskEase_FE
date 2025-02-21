// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config'; // Import appConfig
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http'; // Import withFetch
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app/app-routing.module';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi(), withFetch()), // Add withFetch() here
    provideAnimations()
]
})