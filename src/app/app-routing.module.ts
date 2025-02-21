import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { TaskAddComponent } from './component/task-add/task-add.component';
import { TaskEditComponent } from './component/task-edit/task-edit.component';
import { AuthGuard } from './guards/auth.guard';
import { TaskListComponent } from './component/task-list/task-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }, // Protected
  { path: 'login', component: LoginComponent },  // NOT Protected
  { path: 'register', component: RegisterComponent }, // NOT Protected
  { path: 'add-task', component: TaskAddComponent, canActivate: [AuthGuard] }, // Protected
  { path: 'edit-task/:id', component: TaskEditComponent, canActivate: [AuthGuard] }, // Protected
  { path: 'task-list', component: TaskListComponent, canActivate: [AuthGuard] }, // Protected
  { path: '**', redirectTo: '/home' }
];