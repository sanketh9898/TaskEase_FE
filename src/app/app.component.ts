// src/app/app.component.ts
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router'; // Import Router
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [CommonModule, RouterOutlet]
})
export class AppComponent {
    title = 'frontend';

    constructor(public authService: AuthService, private router: Router) { } // Inject Router

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }

    goToHome() {
        this.router.navigate(['/home']);
    }

    goToAddTask() {
        this.router.navigate(['/add-task']);
    }
    goToTaskList() {
        this.router.navigate(['/task-list']);
    }

    goToLogin() {
        this.router.navigate(['/login']);
    }

    goToRegister() {
        this.router.navigate(['/register']);
    }
}