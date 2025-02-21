// src/app/services/task.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = `${environment.apiUrl}/tasks`;

  constructor(private http: HttpClient, private authService: AuthService) { }

 

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl,{ headers: this.getHeaders() });
  }

  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`,{ headers: this.getHeaders() });
  }

  addTask(task: Task): Observable<Task> {
      return this.http.post<Task>(this.apiUrl, task, { headers: this.getHeaders() });
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task.taskId}`, task, { headers: this.getHeaders() });
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`,{ headers: this.getHeaders() });
  }
  // src/app/services/task.service.ts
private getHeaders(): HttpHeaders {
  const token = this.authService.getToken1();
  console.log("TaskService: getHeaders - Token retrieved:", token); // Log the raw token

  let headers = new HttpHeaders();
  if (token) {
    headers = headers.set('Authorization', 'Bearer ' + token);
    console.log("TaskService: getHeaders - Authorization header:", headers.get('Authorization')); // Log the Authorization header
  }
  headers = headers.set('Content-Type', 'application/json');
  console.log("TaskService: getHeaders - Full Headers:", headers); // Log all headers
  return headers;
}
}